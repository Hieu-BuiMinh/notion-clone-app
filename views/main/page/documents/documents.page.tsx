'use client'

import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'

function DocumentsPageView() {
	const { user } = useUser()
	const create = useMutation(api.documents.creat)

	const onCreate = () => {
		const promise = create({ title: 'Untitled' })
		toast.promise(promise, {
			loading: 'Creating new note...',
			success: 'New note cretated!',
			error: 'Failed to create a new note.',
		})
	}

	return (
		<div className="flex h-full flex-col items-center justify-center space-y-4">
			<Image src="/empty.png" height={300} width={300} alt="Empty" className="dark:hidden" />
			<Image src="/empty-dark.png" height={300} width={300} alt="Empty" className="hidden dark:block" />

			<h2>Welcome to {user?.fullName}&apos;s Jotion</h2>
			<Button onClick={onCreate}>
				<PlusCircle className="mr-2 size-4" />
				Create a note
			</Button>
		</div>
	)
}

export default DocumentsPageView
