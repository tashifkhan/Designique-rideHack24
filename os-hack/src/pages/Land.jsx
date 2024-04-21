import About from "./About";
import Cards from "./Cards";
import Eyes from "./Eyes";
import Featured from "./Feature";
import Footer from "./Footer";
import LandingPage from "./LandingPage";                       
import Marque from "./Marquee";
import Navbar from "./Navbar";                       
// import ReadyTo from "./ReadyTo";

import LocomotiveScroll from "locomotive-scroll";

function Land() {
  const locomotiveScroll = new LocomotiveScroll();
  return (
    <div className="w-full min-h-screen  bg-[#FBF3D5]">
      <LandingPage />
      <Marque />  
      <About />
      <Eyes />
      <Featured />
      <Footer />
    </div>
  );
}

export default Land;