'use client'

import { useMutation, useQuery } from 'convex/react'
import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import { Cover } from '@/views/main/components/cover'
import Editor from '@/views/main/components/editor'
import Toolbar from '@/views/main/components/toolbar'

interface IDocumentDetailPageView {
	documentId: Id<'documents'>
}

function DocumentDetailPageView({ documentId }: IDocumentDetailPageView) {
	const document = useQuery(api.documents.getById, { documentId })

	const update = useMutation(api.documents.update)

	const onChange = (content: string) => {
		update({
			id: documentId,
			content,
		})
	}

	if (document === undefined) {
		return (
			<div>
				<Cover.Skeleton />
				<div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
					<div className="space-y-4 pl-8 pt-4">
						<Skeleton className="h-14 w-1/2" />
						<Skeleton className="h-14 w-4/5" />
						<Skeleton className="h-14 w-2/5" />
						<Skeleton className="h-14 w-3/5" />
					</div>
				</div>
			</div>
		)
	}

	if (document === null) {
		return <div>Not Found</div>
	}

	return (
		<div className="pb-40">
			<Cover url={document.coverImage} />
			<div className="lg:md-max-w-4xl mx-auto md:max-w-3xl">
				<Toolbar initialData={document} />
				<Editor onChange={onChange} initialContent={document.content} />
			</div>
		</div>
	)
}

export default DocumentDetailPageView
