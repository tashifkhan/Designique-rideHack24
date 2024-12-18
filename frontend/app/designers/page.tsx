import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import Features from "@/components/home/Features";
import FeaturedDesigns from "@/components/designs/FeaturedDesigns";
import TopDesigners from "@/components/designers/TopDesigners";

export default function Home() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<Hero />
				<SearchBar />
				<Features />
				<FeaturedDesigns />
				<TopDesigners />
			</div>
		</main>
	);
}
