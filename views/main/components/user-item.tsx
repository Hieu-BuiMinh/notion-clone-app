import { SignOutButton, useUser } from '@clerk/clerk-react'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ChevronsLeftRight } from 'lucide-react'
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

function UserItem() {
	const { user } = useUser()
	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div role="button" className="flex w-full items-center p-3 text-sm hover:bg-primary/5">
						<div className="flex max-w-[calc(100%-25px)] items-center gap-x-2">
							<Avatar className="size-8">
								<AvatarImage src={user?.imageUrl} alt="Avatar" />
								<AvatarFallback>{user?.firstName}</AvatarFallback>
							</Avatar>
							<span className="line-clamp-1 text-start font-medium">{user?.fullName}&apos;s Jotion</span>
						</div>
						<ChevronsLeftRight className="ml-2 size-4 rotate-90 text-muted-foreground" />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-80" align="start" alignOffset={11} forceMount>
					<div className="flex flex-col space-y-4 p-2">
						<p className="text-xs font-medium leading-none text-muted-foreground">
							{user?.emailAddresses[0].emailAddress}
						</p>
						<div className="flex items-center gap-x-2">
							<div className="rounded-md bg-secondary p-1">
								<Avatar className="size-8">
									<AvatarImage src={user?.imageUrl} alt="Avatar" />
									<AvatarFallback>{user?.firstName}</AvatarFallback>
								</Avatar>
							</div>
							<div className="space-y-1">
								<p className="line-clamp-1 text-sm">{user?.fullName}&apos; Jotion</p>
							</div>
						</div>
					</div>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild className="w-full cursor-pointer text-muted-foreground">
						<SignOutButton>Log out</SignOutButton>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default UserItem
