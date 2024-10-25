'use client'

import { ChevronDown, ChevronRight, type LucideIcon } from 'lucide-react'
import React from 'react'

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

function Item({ onClick, label, icon: Icon, id, active, documentIcon, isSearch, level = 0, expanded }: IItem) {
	const ChevronIcon = expanded ? ChevronDown : ChevronRight
	return (
		<div
			onClick={onClick}
			role="button"
			style={{ paddingLeft: level ? 12 * level + 12 : 12 }}
			className={cn(
				'group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5',
				active && 'bg-primary/5 text-primary'
			)}
		>
			{!!id && (
				<div role="button" className="mr-1 h-full hover:bg-neutral-300 dark:bg-neutral-600" onClick={() => {}}>
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
		</div>
	)
}

export default Item
