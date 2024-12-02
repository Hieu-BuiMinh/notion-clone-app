'use client'

import { useQuery } from 'convex/react'
import { MenuIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import Banner from '@/views/main/components/banner'
import Menu from '@/views/main/components/menu'
import Title from '@/views/main/components/title'

interface INavbar {
	isCollapsed: boolean
	onResetWidth: () => void
}

function Navbar({ isCollapsed, onResetWidth }: INavbar) {
	const params = useParams()
	const document = useQuery(api.documents.getById, { documentId: params.documentId as Id<'documents'> })

	if (document === undefined) {
		return (
			<nav className="flex w-full items-center justify-between bg-background px-3 py-2 dark:bg-[#1F1F1F]">
				<Title.Skeleton />
				<div className="flex items-center gap-x-2">
					<Menu.Skeleton />
				</div>
			</nav>
		)
	}
	if (document === null) {
		return null
	}

	return (
		<>
			<nav className="flex w-full items-center gap-x-4 bg-background px-3 py-2 dark:bg-[#1F1F1F]">
				{isCollapsed && (
					<MenuIcon role="button" onClick={onResetWidth} className="size-6 text-muted-foreground" />
				)}

				<div className="flex w-full items-center justify-between">
					<Title initalData={document} />

					<div className="flex items-center gap-2">
						<Menu documentId={document._id} />
					</div>
				</div>
			</nav>
			{document.isArchived && <Banner documentId={document._id} />}
		</>
	)
}

export default Navbar
