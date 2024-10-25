import { useMutation, useQuery } from 'convex/react'
import { ChevronsLeft, MenuIcon, PlusCircle, Search, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import type { ElementRef } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/convex/_generated/api'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import Item from '@/views/main/components/item'
import UserItem from '@/views/main/components/user-item'

function Navigation() {
	const pathname = usePathname()
	const isMobile = useIsMobile()

	const isResizingRef = useRef(false)
	const sidebarRef = useRef<ElementRef<'aside'>>(null)
	const navbarRef = useRef<ElementRef<'div'>>(null)

	const [isResetting, setIsResetting] = useState(false)
	const [isCollapsed, setIsCollapsed] = useState(false)

	const documents = useQuery(api.documents.get)

	const create = useMutation(api.documents.creat)

	const handleMouseMove = (event: MouseEvent) => {
		if (!isResizingRef.current) return

		let newWidth = event.clientX

		if (newWidth < 240) newWidth = 240
		if (newWidth > 480) newWidth = 480

		if (sidebarRef.current && navbarRef.current) {
			sidebarRef.current.style.width = `${newWidth}px`
			navbarRef.current.style.setProperty('left', `${newWidth}px`)
			navbarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`)
		}
	}
	const handleMouseUp = () => {
		isResizingRef.current = false
		document.removeEventListener('mousemove', handleMouseMove)
		document.removeEventListener('mouseup', handleMouseUp)
	}
	const collapse = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(true)
			setIsResetting(true)

			sidebarRef.current.style.width = '0'
			navbarRef.current.style.setProperty('width', '100%')
			navbarRef.current.style.setProperty('left', '0')
			setTimeout(() => setIsResetting(false), 300)
		}
	}
	const resetWidth = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(false)
			setIsResetting(true)

			sidebarRef.current.style.width = isMobile ? '100%' : '240px'
			navbarRef.current.style.setProperty('width', isMobile ? '0' : 'calc(100% - 240px)')
			navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px')
			setTimeout(() => {
				setIsResetting(false)
			}, 300)
		}
	}
	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.preventDefault()
		event.stopPropagation()

		isResizingRef.current = true

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}

	const onCreate = async () => {
		const promise = create({ title: 'Untitled' })
		toast.promise(promise, {
			loading: 'Creating new note...',
			success: 'New note cretated!',
			error: 'Failed to create a new note.',
		})
	}

	useEffect(() => {
		if (isMobile) {
			collapse()
		} else {
			resetWidth()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, isMobile])

	return (
		<>
			<aside
				ref={sidebarRef}
				className={cn(
					'group/sidebar relative z-[99999] flex h-full w-60 flex-col overflow-y-auto bg-secondary',
					isResetting && 'transition-all duration-300 ease-in-out',
					isMobile && 'w-0'
				)}
			>
				<div
					className={cn(
						'absolute right-2 top-3 size-5 rounded-sm text-muted-foreground opacity-0 hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600',
						isMobile && 'opacity-100'
					)}
					role="button"
					onClick={collapse}
				>
					<ChevronsLeft className="size-5" />
				</div>
				<div>
					<UserItem />
					<Item level={0} onClick={() => {}} isSearch label="Search" icon={Search} />
					<Item level={0} onClick={() => {}} label="Setting" icon={Settings} />
					<Item onClick={onCreate} label="New page" icon={PlusCircle} />
				</div>

				<div className="mt-4">
					{documents?.map((document) => {
						return <p key={document._id}>{document.title}</p>
					})}
				</div>
				<div
					onMouseDown={handleMouseDown}
					onClick={resetWidth}
					className="absolute right-0 top-0 h-full w-[2px] cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"
				/>
			</aside>

			<div
				ref={navbarRef}
				className={cn(
					'absolute left-60 top-0 z-[99999] w-[calc(100%-240px)]',
					isResetting && 'transition-all duration-300 ease-in-out',
					isMobile && 'left-0 w-full'
				)}
			>
				<nav className="w-full bg-transparent px-3 py-2">
					{isCollapsed && <MenuIcon className="size-5 text-muted-foreground" onClick={resetWidth} />}
				</nav>
			</div>
		</>
	)
}

export default Navigation
