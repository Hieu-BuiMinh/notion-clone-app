import type { Id } from '@/convex/_generated/dataModel'
import PreviewDetailPageView from '@/views/main/page/preview/preview-detail.page'

interface DocumentIdPageProps {
	params: Promise<{
		documentId: Id<'documents'>
	}>
}

export default async function DocumentIdPage({ params }: DocumentIdPageProps) {
	const documentId = (await params).documentId
	return <PreviewDetailPageView documentId={documentId} />
}
