"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import img1 from '@/images/Manufacture.jpeg'
import img2 from '@/images/ECOM.png'
import img3 from '@/images/Designer.png'
import img4 from '@/images/About.png'
import img5 from '@/images/HI2.png'
export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20 bg-black flex flex-col">
  <h2 className="text-center w-full text-white text-xl md:text-5xl font-bold font-sans" style={{ height: "40%" }}>
    MEET OUR 3 PILLARS
  </h2>
  <div className="flex-1 bg-black">
    <Carousel items={cards} />
  </div>
</div>

  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src= {img5.src}
              alt="Macbook mockup from Aceternity UI"
              height="300"
              width="300"
              className=" w-1/3 h-1/3  mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Pillar Number 1",
    title: "Manufacturer",
    src: img1.src,
    content: <DummyContent />,
  },
  {
    category: "Pillar Number 2",
    title: "Designer",
    src: img3.src,
    content: <DummyContent />,
  },
  {
    category: "Pillar Number 3",
    title: "E-commerce Store",
    src: img2.src,
    content: <DummyContent />,
  },

  {
    category: "Know more",
    title: "About Us",
    src: img4.src,
    content: <DummyContent />,
  },
 
];
