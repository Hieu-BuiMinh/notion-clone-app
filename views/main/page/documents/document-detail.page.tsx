'use client'

import { useQuery } from 'convex/react'
import React from 'react'

import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import Toolbar from '@/views/main/components/toolbar'

interface IDocumentDetailPageView {
	documentId: Id<'documents'>
}

function DocumentDetailPageView({ documentId }: IDocumentDetailPageView) {
	const document = useQuery(api.documents.getById, { documentId })

	if (document === undefined) {
		return <>Loading...</>
	}

	if (document === null) {
		return <>Not found...</>
	}

	return (
		<div className="pb-40">
			<div className="lg:md-max-w-4xl mx-auto md:max-w-3xl">
				<Toolbar initialData={document} />
			</div>
		</div>
	)
}

export default DocumentDetailPageView
