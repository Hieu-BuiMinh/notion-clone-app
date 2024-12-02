import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

import ConfirmModal from '@/components/commons/modals/confirm-modal'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'

function Banner({ documentId }: { documentId: Id<'documents'> }) {
	const router = useRouter()

	const restore = useMutation(api.documents.restore)
	const remove = useMutation(api.documents.remove)

	const onRestore = () => {
		const promise = restore({ id: documentId })
		toast.promise(promise, {
			loading: 'Restoring note...',
			success: 'Note restored',
			error: 'Failed to restore note',
		})
	}

	const onRemove = () => {
		const promise = remove({ id: documentId }).then(() => {})

		toast.promise(promise, {
			loading: 'Deleting note...',
			success: 'Note deleted',
			error: 'Failed to delete note',
		})

		router.push('/documents')
	}

	return (
		<div className="w-ful flex items-center justify-center gap-x-2 bg-rose-500 p-2 text-center text-sm text-white">
			<p>This page is in the Trash</p>

			<Button
				size="sm"
				onClick={onRestore}
				className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white"
			>
				Restore Page
			</Button>
			<ConfirmModal onConfirm={onRemove}>
				<Button
					size="sm"
					className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white"
				>
					Delete Page
				</Button>
			</ConfirmModal>
		</div>
	)
}

export default Banner
