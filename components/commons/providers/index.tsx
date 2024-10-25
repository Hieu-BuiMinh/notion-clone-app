import React from 'react'

import ConvexClientProvider from '@/components/commons/providers/app-convex-provider'
import TanStaskProvider from '@/components/commons/providers/app-tanstack-provider'
import ThemeProvider from '@/components/commons/providers/app-theme-provider'

interface IAppProvider {
	children: React.ReactNode
}
function AppProvider({ children }: IAppProvider) {
	return (
		<TanStaskProvider>
			<ConvexClientProvider>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
					storageKey="jotion-theme"
				>
					{children}
				</ThemeProvider>
			</ConvexClientProvider>
		</TanStaskProvider>
	)
}

export default AppProvider
