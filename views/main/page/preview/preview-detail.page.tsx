'use client'

import { useMutation, useQuery } from 'convex/react'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import { Cover } from '@/views/main/components/cover'
import Toolbar from '@/views/main/components/toolbar'

function PreviewDetailPageView({ documentId }: { documentId: Id<'documents'> }) {
	const Editor = useMemo(() => dynamic(() => import('@/views/main/components/editor'), { ssr: false }), [])

	const document = useQuery(api.documents.getById, {
		documentId: documentId,
	})

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
			<Cover preview url={document.coverImage} />
			<div className="lg:md-max-w-4xl mx-auto md:max-w-3xl">
				<Toolbar preview initialData={document} />
				<Editor editable={false} onChange={onChange} initialContent={document.content} />
			</div>
		</div>
	)
}

export default PreviewDetailPageView
