import React from 'react'

import ConvexClientProvider from '@/components/commons/providers/app-convex-provider'
import TanStaskProvider from '@/components/commons/providers/app-tanstack-provider'
import ThemeProvider from '@/components/commons/providers/app-theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { EdgeStoreProvider } from '@/lib/edgestore'

interface IAppProvider {
	children: React.ReactNode
}
function AppProvider({ children }: IAppProvider) {
	return (
		<TanStaskProvider>
			<EdgeStoreProvider>
				<ConvexClientProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
						disableTransitionOnChange
						storageKey="jotion-theme"
					>
						{children}
						<Toaster position="bottom-center" />
					</ThemeProvider>
				</ConvexClientProvider>
			</EdgeStoreProvider>
		</TanStaskProvider>
	)
}

export default AppProvider
