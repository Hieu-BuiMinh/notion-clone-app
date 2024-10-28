'use client'

import { useQuery } from 'convex/react'
import { FileIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { api } from '@/convex/_generated/api'
import type { Doc, Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import Item from '@/views/main/components/item'

interface IDocumentList {
	parentDocumentId?: Id<'documents'>
	data?: Doc<'documents'>
	level?: number
}

function DocumentList({ level = 0, parentDocumentId }: IDocumentList) {
	const params = useParams()
	const router = useRouter()
	const [expanded, setExpanded] = useState<Record<string, boolean>>({})

	const onExpanded = (documentId: string) => {
		setExpanded((prev) => ({ ...prev, [documentId]: !prev[documentId] }))
	}

	const documents = useQuery(api.documents.getSidebar, { parentDocument: parentDocumentId })

	const onRedirect = (documentId: string) => {
		router.push(`/documents/${documentId}`)
	}

	if (documents === undefined) {
		return (
			<>
				<Item.Skeleton level={level} />
				{level === 0 && (
					<>
						<Item.Skeleton level={level} />
						<Item.Skeleton level={level} />
					</>
				)}
			</>
		)
	}

	return (
		<>
			<p
				className={cn(
					'hidden text-xs font-medium italic text-muted-foreground/80',
					expanded && 'last:block',
					level === 0 && 'hidden'
				)}
				style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
			>
				No pages inside
			</p>
			{documents.map((document) => {
				return (
					<div key={document._id}>
						<Item
							id={document._id}
							onClick={() => {
								onRedirect(document._id)
							}}
							label={document.title}
							icon={FileIcon}
							documentIcon={document.icon}
							active={params.documentId === document._id}
							onExpand={() => onExpanded(document._id)}
							expanded={expanded[document._id]}
							level={level}
						/>
						{expanded[document._id] && <DocumentList parentDocumentId={document._id} level={level + 1} />}
					</div>
				)
			})}
		</>
	)
}

export default DocumentList
