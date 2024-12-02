'use client'

import { ModeToggle } from '@/components/commons/mode-toggle'
import { Label } from '@/components/ui//label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useSettings } from '@/hooks/use-settings'

export default function SettingsModal() {
	const { isOpen, onClose } = useSettings()

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader className="border-b pb-3">
					<DialogTitle className="text-lg font-medium">My settings</DialogTitle>
				</DialogHeader>
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-y-1">
						<Label>Apperance</Label>
						<span className="text-[0.8rem] text-muted-foreground">
							Customize how Jotion looks on your device
						</span>
					</div>
					<ModeToggle />
				</div>
			</DialogContent>
		</Dialog>
	)
}
