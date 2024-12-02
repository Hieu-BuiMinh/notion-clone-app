'use client'

import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { ChevronDown, ChevronRight, type LucideIcon, MoreHorizontal, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'

interface IItem {
	icon: LucideIcon
	label: string
	id?: Id<'documents'>
	documentIcon?: string
	active?: boolean
	expanded?: boolean
	isSearch?: boolean
	level?: number
	onClick: () => void
	onExpand?: () => void
}

function Item({
	onClick,
	label,
	icon: Icon,
	id,
	active,
	documentIcon,
	isSearch,
	level = 0,
	expanded,
	onExpand,
}: IItem) {
	const router = useRouter()
	const { user } = useUser()
	const create = useMutation(api.documents.create)
	const archive = useMutation(api.documents.archive)
	const ChevronIcon = expanded ? ChevronDown : ChevronRight

	const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation()
		onExpand?.()
	}

	const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation()
		if (!id) return
		const promise = create({ title: 'Untitled', parentDocument: id }).then((documentId) => {
			if (!expanded) {
				onExpand?.()
			}
			router.push(`/documents/${documentId}`)
		})
		toast.promise(promise, {
			loading: 'Creating new note...',
			success: 'New note cretated!',
			error: 'Failed to create a new note.',
		})
	}

	const onarchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation()
		if (!id) return

		const promise = archive({ id })
		toast.promise(promise, {
			loading: 'Moving to trash...',
			success: 'Note move to trash!',
			error: 'Failed to archive note.',
		})
	}

	return (
		<div
			onClick={onClick}
			role="button"
			style={{ paddingLeft: level ? `${level * 12 + 12}px` : '12px' }}
			className={cn(
				'group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5',
				active && 'bg-primary/5 text-primary'
			)}
		>
			{!!id && (
				<div
					role="button"
					className="mr-1 h-full rounded hover:bg-neutral-300 dark:hover:bg-neutral-600"
					onClick={handleExpand}
				>
					{<ChevronIcon className="size-4 shrink-0 text-muted-foreground/50" />}
				</div>
			)}

			{documentIcon ? (
				<div className="mr-2 shrink-0 text-[18px]">{documentIcon}</div>
			) : (
				<Icon className="mr-2 h-[18px] shrink-0 text-muted-foreground" />
			)}

			<span className="truncate">{label}</span>
			{isSearch && (
				<kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
					<span className="text-xs">⌘</span>K
				</kbd>
			)}

			{!!id && (
				<div className="ml-auto flex items-center gap-x-2">
					<DropdownMenu>
						<DropdownMenuTrigger
							asChild
							onClick={(event) => {
								event.stopPropagation()
							}}
						>
							<div
								role="button"
								className="ml-auto h-full rounded-sm opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600"
							>
								<MoreHorizontal className="size-4" />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-60" align="start" side="right" forceMount>
							<DropdownMenuItem onClick={onarchive}>
								<Trash className="mr-2 size-4" /> Delete
							</DropdownMenuItem>

							<DropdownMenuItem onClick={onCreate}>
								<Plus className="mr-2 size-4" /> Add
							</DropdownMenuItem>

							<DropdownMenuSeparator />

							<div className="p-2 text-xs text-muted-foreground">Last edited by: {user?.fullName}</div>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)}
		</div>
	)
}

export default Item

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
	return (
		<div className="flex gap-x-2 py-[3px]" style={{ paddingLeft: level ? `${level * 12 + 25}px` : '12px' }}>
			<Skeleton className="size-4" />
			<Skeleton className="h-4 w-[30%]" />
		</div>
	)
}
