import React from 'react'

import Navbar from '@/views/marketing/components/navbar'

function MarketingLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-full dark:bg-[#1F1F1F]">
			<Navbar />
			<main className="h-full pt-40">{children}</main>
		</div>
	)
}

export default MarketingLayout
