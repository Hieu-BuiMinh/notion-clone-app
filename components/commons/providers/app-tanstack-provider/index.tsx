'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'

interface ITanStaskProvider {
	children: React.ReactNode
}

const queryClient = new QueryClient()

function TanStaskProvider({ children }: ITanStaskProvider) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default TanStaskProvider
