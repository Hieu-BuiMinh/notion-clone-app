import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import React from 'react'
import { LuLoader } from 'react-icons/lu'

import { cn } from '@/lib/utils'

const spinnerVariants = cva('text-muted-foreground animate-spin', {
	variants: {
		size: {
			default: 'size-4',
			sm: 'size-2',
			lg: 'size-6',
			icon: 'size-10',
		},
	},
	defaultVariants: {
		size: 'default',
	},
})

type ISpinnerProps = VariantProps<typeof spinnerVariants>

function Loader(props: ISpinnerProps) {
	return <LuLoader className={cn(spinnerVariants({ size: props.size }))} />
}

export default Loader
