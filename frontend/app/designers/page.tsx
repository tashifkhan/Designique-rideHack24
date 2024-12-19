import Hero from "@/components/designers/header/Hero";
import SearchBar from "@/components/designers/header/SearchBar";
import Features from "@/components/designers/header/Features";
import FeaturedDesigns from "@/components/designers/FeaturedDesigns";
import TopDesigners from "@/components/designers/TopDesigners";
import NavBar from "@/components/NavBar";

export default function Home() {
	return (
		<>
			<NavBar />

			<main className="min-h-screen bg-gradient-to-br from-slate-900 via-[#000] to-slate-900">
				<div className="w-full md:w-11/12 lg:w-10/12 xl:w-4/5 mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
					<div className="space-y-4 md:space-y-6 lg:space-y-8">
						<Hero />
						<SearchBar />
						<Features />
						<FeaturedDesigns />
						<TopDesigners />
					</div>
				</div>
			</main>
		</>
	);
}
