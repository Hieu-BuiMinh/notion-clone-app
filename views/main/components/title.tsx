import { useMutation } from 'convex/react'
import React, { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import type { Doc } from '@/convex/_generated/dataModel'

interface ITitle {
	initalData: Doc<'documents'>
}

function Title({ initalData }: ITitle) {
	const update = useMutation(api.documents.update)

	const inputRef = useRef<HTMLInputElement>(null)
	const [isEditing, setIsEditing] = useState(false)
	const [title, setTitle] = useState(initalData.title || 'Untitled')

	const enableInput = () => {
		setTitle(initalData.title)
		setIsEditing(true)
		setTimeout(() => {
			inputRef.current?.focus()
			inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
		}, 0)
	}

	const disableInput = () => {
		setIsEditing(false)
	}

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value)
		update({ id: initalData._id, title: event.target.value || 'Untitled' })
	}

	const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			disableInput()
		}
	}

	return (
		<div className="flex items-center gap-x-1">
			{!!initalData.icon && <p>{initalData.icon}</p>}
			{isEditing ? (
				<Input
					ref={inputRef}
					onClick={enableInput}
					onBlur={disableInput}
					onChange={onChange}
					onKeyDown={onKeyDown}
					value={title}
					className="h-7 px-2 focus-visible:ring-transparent"
				/>
			) : (
				<Button onClick={enableInput} variant="ghost" size="sm" className="h-auto p-1 font-normal">
					<span className="truncate">{initalData.title}</span>
				</Button>
			)}
		</div>
	)
}

export default Title

Title.Skeleton = function TitleSkeleton() {
	return <Skeleton className="h-9 w-20 rounded-md" />
}
