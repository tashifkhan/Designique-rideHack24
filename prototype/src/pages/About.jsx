function About() {
	return (
		<div
			data-scroll
			data-scroll-speed="-.1.5"
			className="w-full p-20 bg-[#679B9B] rounded-tl-3xl rounded-tr-3xl text-[#f5f5f5] flex flex-col"
		>
			<h1 className="font-['Neue_Montreal'] text-[4vw] leading-[3.5vw] tracking-tight ">
				We are a team constituted by a few BTech students from JIIT Noida aiming
				to resolve a major gap in the market
			</h1>

			<div className="flex flex-col pt-8 gap-y-30  pb-0 mb-40 mt-32 border-t-[1px] border-[#a1b562]">
				<div className="flex flex-row md:flex-row gap-x-10 lg:gap-x-20">
					<div className=" font-medium">
						<p className="font-['Neue_Montreal'] text-white text-2xl">
							<u>WHY YOU CAN TRUST US</u> --
						</p>
					</div>
					<div>
						<div className="wysiwyg w-600 h-600 align-center justify-center">
							Welcome to Designique, where we redefine the way you do business
							and shop online. As a pioneering platform serving both B2B and B2C
							markets, we are committed to establishing a secure, reliable, and
							efficient environment for all stakeholders. Our dedication to
							security is unmatched; we employ innovative, industry-leading
							protocols and professional encryption measures to ensure that
							every transaction is protected. With the integration of robust
							functionalities like Razorpay, we streamline payment processes,
							making them seamless and hassle-free. Trust in Designique to be
							your partner in commerce, providing a trusted platform where
							opportunities are endless and every interaction is a step toward
							mutual success. Join us in crafting a brighter future in
							ecommerce, where your security and success are our top priorities.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default About;
