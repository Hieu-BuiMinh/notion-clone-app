import Footer from '@/views/marketing/components/footer'
import Heading from '@/views/marketing/components/heading'
import Heroes from '@/views/marketing/components/heroes'

function MarketingPageView() {
	return (
		<div className="flex min-h-full flex-col dark:bg-[#1F1F1F]">
			<div className="flex flex-1 flex-col items-center justify-center gap-y-8 px-6 pb-10 text-center md:justify-between">
				<Heading />
				<Heroes />
			</div>
			<Footer />
		</div>
	)
}

export default MarketingPageView
