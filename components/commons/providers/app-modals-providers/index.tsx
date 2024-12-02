'use client'

import { useEffect, useState } from 'react'

import CoverImageModal from '@/components/commons/modals/cover-image-modal'
import SettingsModal from '@/components/commons/modals/settings-modal'

export function ModalProvider() {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return null
	}

	return (
		<>
			<SettingsModal />
			<CoverImageModal />
		</>
	)
}
