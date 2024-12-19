import Hero from "@/components/designers/header/Hero";
import SearchBar from "@/components/designers/header/SearchBar";
import Features from "@/components/designers/header/Features";
import FeaturedDesigns from "@/components/designers/FeaturedDesigns";
import TopDesigners from "@/components/designers/TopDesigners";

export default function Home() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-900 via-[#000] to-slate-900">
			<div className="xl:w-4/5 mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<Hero />
				<SearchBar />
				<Features />
				<FeaturedDesigns />
				<TopDesigners />
			</div>
		</main>
	);
}
