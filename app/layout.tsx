import './globals.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'

import AppProvider from '@/components/commons/providers'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'Jotion',
	description: 'The connected workspace where better, faster work happens.',
	icons: {
		icon: [
			{ media: '(prefers-color-scheme: light)', url: '/logo.svg', href: '/logo.svg' },
			{ media: '(prefers-color-scheme: dark)', url: '/logo-dark.svg', href: '/logo-dark.svg' },
		],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html suppressHydrationWarning lang="en">
			<body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	)
}
