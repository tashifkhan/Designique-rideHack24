"use client";

import React, { useEffect, useState } from "react";
import { BackgroundLinesDemo } from "@/components/Home/Intro";
import { Carousel } from "@/components/Home/Carousel";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'; // Importing icons for social media

const Home: React.FC = () => {
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);

  useEffect(() => {
    // Smooth scroll effect
    const scrollToPosition = () => {
      const start = window.scrollY;
      const end = start + window.innerHeight; // Scroll to the next screen height
      const duration = 1000; // Duration of scroll in ms (1000ms = 1 second)
      let startTime: number | null = null;

      const scrollStep = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const scrollAmount = Math.min(progress / duration, 1) * (end - start);

        window.scrollTo(0, start + scrollAmount);

        if (progress < duration) {
          requestAnimationFrame(scrollStep); // Keep scrolling until duration is reached
        }
      };

      requestAnimationFrame(scrollStep); // Start scrolling
    };

    // Trigger smooth scroll after 3 seconds
    const timer = setTimeout(() => {
      scrollToPosition();
    }, 5000); // Delay the scroll by 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  useEffect(() => {
    // Intersection Observer to trigger loading of AppleCardsCarouselDemo when in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCarouselVisible(true);
          observer.disconnect(); // Stop observing once the element is in view
        }
      },
      { threshold: 0.04 } // Trigger when 50% of the element is in the viewport
    );

    const carouselElement = document.getElementById("carousel");

    if (carouselElement) {
      observer.observe(carouselElement); // Start observing the element
    }

    // Cleanup the observer
    return () => {
      if (carouselElement) {
        observer.unobserve(carouselElement);
      }
    };
  }, []);

  return (
    <div className="h-screen w-full m-0 bg-black p-0">
      <div className="h-screen w-full m-0 p-0">
        <BackgroundLinesDemo />
      </div>

      {/* Add "id" to the div to target it with IntersectionObserver */}
      <div
        id="carousel"
        className="flex items-center justify-center"
        style={{ height: "100vh" }} // Ensure it takes full viewport height
      >
        {isCarouselVisible && <Carousel />}
      </div>

      {/* Footer Section */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-xl mb-4">Designique - Connecting Manufacturers & Designers</p>
          <div className="flex justify-center space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={30} className="hover:text-blue-600 transition-colors" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30} className="hover:text-pink-600 transition-colors" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={30} className="hover:text-blue-400 transition-colors" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={30} className="hover:text-blue-800 transition-colors" />
            </a>
          </div>
          <p className="mt-4 text-sm">© 2024 Designique. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
