import { motion } from "framer-motion";

function Marquee() {
  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed=".1"
      className="w-full py-5 rounded-tl-3xl rounded-tr-3xl bg-[#0000]"
    >
      <div className="text border-t-2 border-b-2 border-black flex gap-10 overflow-hidden whitespace-nowrap">
        <motion.h1
          initial={{ x: "0" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
          className="text-[16vw] text-black leading-none font-['Founders_Grotesk_X-Condensed'] uppercase -mt-[1vw] -mb-[1vw] font-semibold pr-[1r]"
        >
          Team Underdogs
        </motion.h1>
        <motion.h1
          initial={{ x: "0" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
          className="text-[24vw] leading-none font-['Founders_Grotesk_X-Condensed'] uppercase -mt-[3.5vw] -mb-[1vw] font-semibold pr-[1r]"
        >
       
        </motion.h1>
      </div>
    </div>
  );
}

export default Marquee;