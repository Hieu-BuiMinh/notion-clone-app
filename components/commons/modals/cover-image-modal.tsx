'use client'

import { useMutation } from 'convex/react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

import { SingleImageDropzone } from '@/components/commons/single-image-dropzone'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import { useConverImage } from '@/hooks/use-cover-image'
import { useEdgeStore } from '@/lib/edgestore'

function CoverImageModal() {
	const params = useParams()
	const update = useMutation(api.documents.update)
	const [file, setFile] = useState<File>()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const coverImage = useConverImage()
	const { edgestore } = useEdgeStore()

	const onClose = () => {
		setFile(undefined)
		setIsSubmitting(false)
		coverImage.onClose()
	}

	const onChange = async (file?: File) => {
		if (file) {
			setIsSubmitting(true)
			setFile(file)

			const response = await edgestore.publicFiles.upload({
				file,
				options: {
					replaceTargetUrl: coverImage.url,
				},
			})

			await update({
				id: params.documentId as Id<'documents'>,
				coverImage: response.url,
			})

			onClose()
		}
	}
	return (
		<Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
			<DialogContent>
				<DialogHeader>
					<h2 className="text-center text-lg font-semibold">Cover Image</h2>
				</DialogHeader>
				<SingleImageDropzone
					className="w-full outline-none"
					disabled={isSubmitting}
					value={file}
					onChange={onChange}
				/>
			</DialogContent>
		</Dialog>
	)
}

export default CoverImageModal