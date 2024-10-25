import { Poppins } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

import { cn } from '@/lib/utils'

const font = Poppins({
	subsets: ['latin'],
	weight: ['400', '600'],
})

function Logo() {
	return (
		<div className="hidden items-center gap-2 md:flex">
			<Image src="/logo.svg" height={40} width={40} alt="Logo" className="dark:hidden" />
			<Image src="/logo-dark.svg" height={40} width={40} alt="Logo" className="hidden dark:block" />
			<p className={cn({ 'font-semibold': true, [font.className]: true })}>Jotion</p>
		</div>
	)
}

export default Logo
