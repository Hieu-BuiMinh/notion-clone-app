'use client'

import { useMutation } from 'convex/react'
import { ImageIcon, X } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

import { Skeleton } from '@/components//ui/skeleton'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import { useCoverImage } from '@/hooks/use-cover-image'
import { useEdgeStore } from '@/lib/edgestore'
// import { useEdgeStore } from '@/lib/edgestore'
import { cn } from '@/lib/utils'

interface CoverProps {
	url?: string
	preview?: boolean
}

export function Cover({ url, preview }: CoverProps) {
	const { edgestore } = useEdgeStore()
	const params = useParams()
	const coverImage = useCoverImage()
	const removeCoverImage = useMutation(api.documents.removeCoverImage)

	const onRemove = async () => {
		if (url) {
			await edgestore.publicFiles
				.delete({
					url: url,
				})
				.then(() => {
					removeCoverImage({
						id: params.documentId as Id<'documents'>,
					})
				})
		}
	}

	return (
		<div className={cn(`group relative h-[35vh] w-full`, !url && 'h-[12vh]', url && 'bg-muted')}>
			{!!url && <Image className="object-cover" src={url} alt="Cover" fill />}
			{url && !preview && (
				<div className="absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100">
					<Button
						className="text-xs text-muted-foreground"
						variant="outline"
						size="sm"
						onClick={() => coverImage.onReplace(url)}
					>
						<ImageIcon className="mr-2 size-4" />
						Change Cover
					</Button>
					<Button className="text-xs text-muted-foreground" variant="outline" size="sm" onClick={onRemove}>
						<X className="mr-2 size-4" />
						Remove
					</Button>
				</div>
			)}
		</div>
	)
}

Cover.Skeleton = function CoverSkeleton() {
	return <Skeleton className="h-[12vh] w-full" />
}
