'use client'

import { SignInButton, UserButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'
import Link from 'next/link'
import React from 'react'

import Loader from '@/components/commons/loader'
import { ModeToggle } from '@/components/commons/mode-toggle'
import { Button } from '@/components/ui/button'
import { useScrollTop } from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils'
import Logo from '@/views/marketing/components/logo'

function Navbar() {
	const { isAuthenticated, isLoading } = useConvexAuth()
	const scrolled = useScrollTop()

	return (
		<div
			className={cn(
				'fixed top-0 z-50 flex w-full items-center bg-background p-6 dark:bg-[#1F1F1F]',
				scrolled && 'border-b shadow-sm'
			)}
		>
			<Logo />

			<div className="flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
				{isLoading && <Loader />}
				{!isAuthenticated && !isLoading && (
					<>
						<SignInButton mode="modal">
							<Button variant="ghost" size="sm">
								Login
							</Button>
						</SignInButton>
						<SignInButton mode="modal">
							<Button size="sm">Get Jotion Free</Button>
						</SignInButton>
					</>
				)}

				{isAuthenticated && !isLoading && (
					<>
						<Button variant="ghost" size="sm">
							<Link href="/documents">Enter Jotion</Link>
						</Button>
						<UserButton />
					</>
				)}
				<ModeToggle />
			</div>
		</div>
	)
}

export default Navbar
