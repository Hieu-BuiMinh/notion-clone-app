'use client'

import { useMutation } from 'convex/react'
import { ImageIcon, Smile, X } from 'lucide-react'
import type { ElementRef } from 'react'
import React, { useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import IconPicker from '@/components/commons/icon-picker'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import type { Doc } from '@/convex/_generated/dataModel'
import { useConverImage } from '@/hooks/use-cover-image'

interface IToolbar {
	initialData: Doc<'documents'>
	preview?: boolean
}
function Toolbar({ initialData, preview }: IToolbar) {
	const inputRef = useRef<ElementRef<'textarea'>>(null)
	const [isEditing, setIsEditing] = useState(false)
	const [value, setValue] = useState(initialData.title)

	const update = useMutation(api.documents.update)
	const removeIcon = useMutation(api.documents.removeIcon)

	const enableInput = () => {
		if (preview) return

		setIsEditing(true)
		setTimeout(() => {
			setValue(initialData.title)
			inputRef.current?.focus()
		}, 0)
	}

	const disableInput = () => setIsEditing(false)

	const onInput = (value: string) => {
		setValue(value)
		update({
			id: initialData._id,
			title: value || 'Untitled',
		})
	}

	const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault()
			disableInput()
		}
	}

	const onIconSelect = (icon: string) => {
		update({
			id: initialData._id,
			icon,
		})
	}

	const onRemoveIcon = () => {
		removeIcon({
			id: initialData._id,
		})
	}

	const coverImage = useConverImage()

	return (
		<div className="group relative pl-[54px]">
			{!!initialData.icon && !preview && (
				<div className="group/icon flex items-center gap-x-2 pt-5">
					<IconPicker onChange={onIconSelect}>
						<p className="text-6xl transition hover:opacity-75">{initialData?.icon}</p>
					</IconPicker>
					<Button
						onClick={onRemoveIcon}
						className="rounded-full text-xs text-muted-foreground opacity-0 transition group-hover/icon:opacity-100"
						variant="outline"
						size="icon"
					>
						<X className="size-4" />
					</Button>
				</div>
			)}
			{!!initialData.icon && preview && <p className="pt-6 text-6xl">{initialData.icon}</p>}
			<div className="flex items-center gap-x-1 py-4 opacity-0 group-hover:opacity-100">
				{!initialData.icon && !preview && (
					<IconPicker asChild onChange={onIconSelect}>
						<Button className="text-xs text-muted-foreground" variant="outline" size="sm">
							<Smile className="mr-2 size-4" />
							Add icon
						</Button>
					</IconPicker>
				)}
				{!initialData.coverImage && !preview && (
					<Button
						className="text-xs text-muted-foreground"
						variant="outline"
						size="sm"
						onClick={coverImage.onOpen}
					>
						<ImageIcon className="mr-2 size-4" />
						Add cover
					</Button>
				)}
			</div>
			{isEditing && !preview ? (
				<TextareaAutosize
					className="resize-none break-words bg-transparent text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]"
					ref={inputRef}
					onBlur={disableInput}
					onKeyDown={onKeyDown}
					value={value}
					onChange={(e) => onInput(e.target.value)}
				/>
			) : (
				<div
					className="break-words pb-[11.5px] text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]"
					onClick={enableInput}
				>
					{initialData.title}
				</div>
			)}
		</div>
	)
}

export default Toolbar
