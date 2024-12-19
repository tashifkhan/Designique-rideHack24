import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision2";

export default function BackgroundBeamsWithCollisionDemo() {
  return (
    <BackgroundBeamsWithCollision>
      <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
        Manufacturer
        <br />
        <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
          <span className="text-xl sm:text-sm md:text-base lg:text-4xl">
            Here is a list of manufacturers you can contact for your production needs.
          </span>
        </div>
      </h2>
    </BackgroundBeamsWithCollision>
  );
}
