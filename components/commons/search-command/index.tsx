'use client'

import { useUser } from '@clerk/clerk-react'
import { useQuery } from 'convex/react'
import { File } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { DialogTitle } from '@/components/ui/dialog'
import { api } from '@/convex/_generated/api'
import { useSearch } from '@/hooks/use-search'

function SearchCommand() {
	const { user } = useUser()
	const router = useRouter()
	const documents = useQuery(api.documents.getSearch)
	const [isMounted, setIsMounted] = useState(false)

	const { toggle, isOpen, onClose } = useSearch()

	const onSelect = (id: string) => {
		router.push(`documents/${id}`)
	}

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		const down = (event: KeyboardEvent) => {
			if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
				event.preventDefault()
				toggle()
			}
		}

		document.addEventListener('keydown', down)

		return () => document.removeEventListener('keydown', down)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [toggle])

	if (!isMounted) {
		return null
	}

	return (
		<CommandDialog open={isOpen} onOpenChange={onClose}>
			<DialogTitle></DialogTitle>
			<CommandInput placeholder={`Search ${user?.fullName}'s Jotion...`} />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>

				{documents && documents.length > 0 && (
					<CommandGroup heading="Documents">
						{documents?.map((document) => {
							return (
								<CommandItem
									key={document._id}
									value={`${document._id}-${document.title}`}
									title={document.title}
									onSelect={() => {
										onSelect(document._id)
									}}
								>
									{document.icon ? (
										<p className="mr-2 text-[18px]">{document.icon}</p>
									) : (
										<File className="mr-2 size-4" />
									)}
									<span>{document.title}</span>
								</CommandItem>
							)
						})}
					</CommandGroup>
				)}
			</CommandList>
		</CommandDialog>
	)
}

export default SearchCommand
