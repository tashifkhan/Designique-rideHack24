import { motion, useAnimation } from "framer-motion";
import { Link } from 'react-router-dom'
import Con from "./images/Consumer.jpeg";
import Des from "./images/Designer.jpeg";
import Man from "./images/Manufacturer.jpg";
import aboutus from './images/AboutUs.jpg';

function Featured() {
  const cards = [useAnimation(), useAnimation()];

  const handleHover = (index) => {
    cards[index].start({ y: "0" });
  };

  const handleHoverEnd = (index) => {
    cards[index].start({ y: "100%" });
  };

  return (
    <div className="w-full py-20">
      <div className="w-full px-20 border-b-[1px] pb-20 text-white border-white bg-black flex items-center justify-center">
        <h1 className="text-8xl font-['Neue_Montreal'] tracking-tight mt-5">
         Our Pillars
        </h1>
      </div>
      <div className="px-20">
        <div className="cards w-full flex gap-10 mt-10 mb-10">
          <motion.div
            onHoverStart={() => handleHover(0)}
            onHoverEnd={() => handleHoverEnd(0)}
            className="cardContainer relative w-1/2 h-[75vh]  "
          >
            <Link to='/manufacture'><li className="text-4xl font-semibold mb-2">EXPLORE THE MANUFACTURER</li></Link>
            <h1 className="absolute text-[#3C5B6F] flex overflow-hidden z-[9] translate-x-1/2 top-1/2 -translate-y-1/2 leading-none tracking-tighter right-0 text-8xl ">
              {"MANUFACTURER".split("").map((item, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "100%" }}
                  animate={cards[0]}
                  transition={{ ease: [0.22, 2, 0.36, 1], delay: index * 0.01 }}
                  className="inline-block"
                >
                  {item}
                </motion.span>
              ))}
            </h1>
            <motion.div
              className="card w-full h-full rounded-xl overflow-hidden"
              whileHover={{ scale: 0.97 }} // Increase the scale on hover
              transition={{ ease: "easeInOut", duration: 0.2 }} // Transition duration
            >
              <motion.img
                className="w-full h-full bg-cover"
                whileHover={{ scale: 1.12 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
                src={Man}
                alt="basicImage"
              />
            </motion.div>
          </motion.div>

          <motion.div
            onHoverStart={() => handleHover(1)}
            onHoverEnd={() => handleHoverEnd(1)}
            className="cardContainer relative w-1/2 h-[75vh]  "
          >
            <Link to='/designers'><li className="text-4xl font-semibold mb-2">MEET THE CONTENT HERO</li></Link>
            <h1 className="absolute text-[#CDEA68] hover:flex overflow-hidden z-[9] -translate-x-1/2 top-1/2 -translate-y-1/2 leading-none tracking-tighter left-0 text-8xl ">
              {"DESIGNER".split("").map((item, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "100%" }}
                  animate={cards[1]}
                  transition={{ ease: [0.22, 2, 0.36, 1], delay: index * 0.01 }}
                  className="inline-block"
                >
                  {item}
                </motion.span>
              ))}
            </h1>
            <motion.div
              className="card w-full h-full rounded-xl overflow-hidden"
              whileHover={{ scale: 0.97 }}
              transition={{ ease: "easeInOut", duration: 0.3 }} // Transition duration
            >
              <motion.img
                whileHover={{ scale: 1.12 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
                className="w-full h-full bg-cover"
                src={Des}
                alt="basicImage"
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="cards w-full flex gap-10 mt-10 mb-10">
          <motion.div
            onHoverStart={() => handleHover(0)}
            onHoverEnd={() => handleHoverEnd(0)}
            className="cardContainer relative w-1/2 h-[75vh] mt-10 "
          >
            <Link to='/shop'><li className="text-4xl font-semibold mb-10">OPEN THE SHOP</li></Link>

            <h1 className="absolute text-[#CDEA68] hover:flex overflow-hidden z-[9] translate-x-1/2 top-1/2 -translate-y-1/2 leading-none tracking-tighter right-0 text-8xl">
              {"CONSUMER".split("").map((item, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "100%" }}
                  animate={cards[0]}
                  transition={{ ease: [0.22, 2, 0.36, 1], delay: index * 0.01 }}
                  className="inline-block"
                >
                  {item}
                </motion.span>
              ))}
            </h1>
            <motion.div
              className="card w-full h-full rounded-xl overflow-hidden"
              whileHover={{ scale: 0.97 }} // Increase the scale on hover
              transition={{ ease: "easeInOut", duration: 0.3 }} // Transition duration
            >
              <motion.img
                className="w-full h-full bg-cover"
                whileHover={{ scale: 1.12 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
                src={Con}
                alt="basicImage"
              />
            </motion.div>
          </motion.div>

          <motion.div
            onHoverStart={() => handleHover(1)}
            onHoverEnd={() => handleHoverEnd(1)}
            className="cardContainer relative w-1/2 h-[75vh] mt-10"
          >
            <li className="text-4xl font-semibold mb-2">ABOUT US</li>

            <h1 className="absolute text-[#3C5B6F] flex overflow-hidden z-[9] -translate-x-1/2 top-1/2 -translate-y-1/2 leading-none tracking-tighter left-0 text-8xl">
              {"ABOUT".split("").map((item, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "100%" }}
                  animate={cards[1]}
                  transition={{ ease: [0.22, 2, 0.36, 1], delay: index * 0.01 }}
                  className="inline-block"
                >
                  {item}
                </motion.span>
              ))}
            </h1>
            <motion.div
              className="card w-full h-full rounded-xl overflow-hidden"
              whileHover={{ scale: 0.97 }}
              transition={{ ease: "easeInOut", duration: 0.3 }} // Transition duration
            >
              <motion.img
                whileHover={{ scale: 1.12 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
                className="w-full h-full bg-cover"
                src={aboutus}
                alt="basicImage"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Featured;