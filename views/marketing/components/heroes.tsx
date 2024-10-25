import Image from 'next/image'
import React from 'react'

function Heroes() {
	return (
		<div className="flex max-w-5xl flex-col items-center justify-center">
			<div className="flex items-center">
				<div className="relative size-[300px] md:size-[350px]">
					<Image src="/documents.png" fill className="object-contain dark:hidden" alt="Documents" />
					<Image
						src="/documents-dark.png"
						fill
						className="hidden object-contain dark:block"
						alt="Documents"
					/>
				</div>
				<div className="relative hidden size-[300px] md:block md:size-[350px]">
					<Image src="/reading.png" fill className="object-contain dark:hidden" alt="Reading" />
					<Image src="/reading-dark.png" fill className="hidden object-contain dark:block" alt="Reading" />
				</div>
			</div>
		</div>
	)
}

export default Heroes
