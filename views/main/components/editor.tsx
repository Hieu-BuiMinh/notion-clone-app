'use client'

import '@blocknote/core/fonts/inter.css'
import '@blocknote/mantine/style.css'

import type { BlockNoteEditor, PartialBlock } from '@blocknote/core'
import { BlockNoteView } from '@blocknote/mantine'
import { useCreateBlockNote } from '@blocknote/react'
import { useTheme } from 'next-themes'

import { useEdgeStore } from '@/lib/edgestore'

interface EditorProps {
	onChange: (value: string) => void
	initialContent?: string
	editable?: boolean
}

function Editor({ onChange, initialContent, editable }: EditorProps) {
	const { resolvedTheme } = useTheme()
	const { edgestore } = useEdgeStore()

	const handleUpload = async (file: File) => {
		const response = await edgestore.publicFiles.upload({ file })

		return response.url
	}

	const editor: BlockNoteEditor = useCreateBlockNote({
		// editable,
		initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
		// onEditorContentChange: (editor) => {
		// 	onChange(JSON.stringify(editor.topLevelBlocks, null, 2))
		// },
		uploadFile: handleUpload,
	})

	return (
		<div>
			<BlockNoteView
				editable={editable}
				onChange={() => {
					onChange(JSON.stringify(editor.document, null, 2))
				}}
				editor={editor}
				theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
			/>
		</div>
	)
}

export default Editor
