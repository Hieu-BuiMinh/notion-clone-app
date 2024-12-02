import React from 'react'

import type { Id } from '@/convex/_generated/dataModel'
import DocumentDetailPageView from '@/views/main/page/documents/document-detail.page'

interface IDocumentDetailPage {
	params: Promise<{
		documentId: Id<'documents'>
	}>
}

async function DocumentDetailPage({ params }: IDocumentDetailPage) {
	const _params = await params

	return <DocumentDetailPageView documentId={_params.documentId} />
}

export default DocumentDetailPage
