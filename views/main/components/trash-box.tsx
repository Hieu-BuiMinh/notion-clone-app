'use client'

import { useMutation, useQuery } from 'convex/react'
import { Search, Trash, Undo } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

import Loader from '@/components/commons/loader'
import ConfirmModal from '@/components/commons/modals/confirm-modal'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'

function TrashBox() {
	const router = useRouter()
	const params = useParams()
	const documents = useQuery(api.documents.getTrash)
	const restore = useMutation(api.documents.restore)
	const remove = useMutation(api.documents.remove)

	const [search, setSearch] = useState('')
	const filteredDocuments = documents?.filter((document) => {
		return document.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
	})

	const onClick = (documentId: string) => {
		router.push(`/documents/${documentId}`)
	}

	const onRestore = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, documentId: Id<'documents'>) => {
		event.stopPropagation()

		const promise = restore({ id: documentId })
		toast.promise(promise, {
			loading: 'Restoring note...',
			success: 'Note restored',
			error: 'Failed to restore note',
		})
	}
	const onRemove = (documentId: Id<'documents'>) => {
		const promise = remove({ id: documentId })
		toast.promise(promise, {
			loading: 'Deleting note...',
			success: 'Note deleted',
			error: 'Failed to delete note',
		})

		if (params.documentId === documentId) {
			router.push('/documents')
		}
	}

	if (documents === undefined) {
		return (
			<div className="flex h-full items-center justify-center p-4">
				<Loader size="lg" />
			</div>
		)
	}

	return (
		<div className="">
			<div className="flex items-center gap-x-1 p-2 text-sm">
				<Search className="size-4" />
				<Input
					className="h-7 bg-secondary px-2 focus-visible:ring-transparent"
					value={search}
					onChange={(event) => {
						setSearch(event.target.value)
					}}
					placeholder="Filter by page title..."
				/>
			</div>

			<div className="mt-2 px-1 pb-1">
				<p className="hidden pb-2 text-center text-xs text-muted-foreground last:block">No documents found.</p>
				{filteredDocuments?.map((document) => {
					return (
						<div
							key={document._id}
							role="button"
							onClick={() => {
								onClick(document._id)
							}}
							className="flex w-full items-center justify-between rounded-sm text-sm text-primary hover:bg-primary/5"
						>
							<span className="truncate pl-2">{document.title}</span>
							<div className="flex items-center">
								<div
									className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
									onClick={(event) => {
										onRestore(event, document._id)
									}}
									role="button"
								>
									<Undo className="size-4 text-muted-foreground" />
								</div>
								<ConfirmModal onConfirm={() => onRemove(document._id)}>
									<div
										className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
										role="button"
									>
										<Trash className="size-4 text-muted-foreground" />
									</div>
								</ConfirmModal>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default TrashBox
