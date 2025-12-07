import { useState, useEffect, useRef } from "react";
import { Link, Element } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import "../app.css";
import chibi from "../assets/images/chibi.png";
import chibi2 from "../assets/images/chibi2.png";
import ChatBox from "../components/utils/ChatBox";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { ArrowRight, ArrowUpRight } from "lucide-react";

AOS.init();

const Hero = () => {
  const [displayText, setDisplayText] = useState("");

  const [currentPage, setCurrentPage] = useState("Home");
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const text = "Hello! I'm Rahul";
  const subtitle = "-- If It Works, Don’t Touch It (…But I Still Do)";

  // Check for mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1300);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close menu when clicking on a page
  const handlePageClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  // Typing animation
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const pages = [
    "Home",
    "About Me",
    "Projects",
    "Tech Stack",
    "Certifications",
 
  ];

  return (
    <Element name="Home">
      <div className="min-h-screen w-screen bg-[var(--bg1)] text-[var(--text1)] relative overflow-hidden ">
        
        {/* Navbar */}
        <nav
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[var(--bg2)] backdrop-blur-2xl px-4 md:px-8 py-3 rounded-full shadow-lg z-50 flex items-center justify-between sm:w-[95%] md:w-[70%]  border border-white/10 backdrop-blur-sm"
          data-aos="fade-down"
          data-aos-duration="500"
        >
          <div className="flex items-center pr-20 gap-2">
            <img
              src={chibi2}
              alt="chibi"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 p-1"
              loading="lazy"
            />
            <span className="font-semibold text-base md:text-lg tracking-wide">
              Rahul
            </span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden xl:flex  gap-4 lg:gap-6 text-[var(--text2)]">
            {pages.map((p) => (
              <li
                key={p}
                className={`cursor-pointer transition-all text-sm lg:text-base ${
                  currentPage === p
                    ? "text-white font-semibold border-b-2 border-white"
                    : "hover:text-white/80"
                }`}
              >
                <Link
                  to={p}
                  smooth={true}
                  duration={500}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {/* Desktop Connect Button */}
            <Element className="hidden xl:block bg-white/10 text-white border border-white/20 px-4 py-1 rounded-full hover:bg-white/20 transition text-xs lg:text-sm md:text-base cursor-pointer">

              Let's Connect
            </Element>

            {/* Mobile Hamburger Menu */}
            {isMobile && (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex flex-col gap-1 w-6 h-6 justify-center items-center"
                >
                  <span
                    className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                      isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                  ></span>
                  <span
                    className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                      isMenuOpen ? "opacity-0" : ""
                    }`}
                  ></span>
                  <span
                    className={`w-5 h-0.5 bg-white transition-all duration-300 ${
                      isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                  ></span>
                </button>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-12 right-0 bg-[var(--bg2)] backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl py-3 min-w-[180px] z-50"
                    >
                      {/* Navigation Links */}
                      <div className="flex flex-col">
                        {pages.map((p) => (
                          <button
                            key={p}
                            className={`px-4 py-2 text-left transition-all text-sm ${
                              currentPage === p
                                ? "text-white font-semibold bg-white/10"
                                : "text-[var(--text2)] hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <Link
                              to={p}
                              smooth={true}
                              duration={500}
                              onClick={() => handlePageClick(p)}
                            >
                              {p}
                            </Link>
                          </button>
                        ))}
                      </div>

                      {/* Divider */}
                      <div className="border-t border-white/10 my-2"></div>

                      {/* Mobile Connect Button */}
                      <button className="w-full px-4 py-2 text-left text-sm bg-white/10 text-white hover:bg-white/20 transition">
                        Let's Connect
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </nav>

        {/* Backdrop for mobile menu */}
        <AnimatePresence>
          {isMobile && isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row  items-center justify-center text-center w-full min-h-screen px-4 md:px-6 pt-20 pb-8 md:py-0 md:mt-5 ">
          <div className="img">
            <img
              src={chibi}
              data-aos="fade-up"
              data-aos-duration="1000"
              alt=""
              className="md:h-120"
              loading="lazy"
            />
          </div>

          <div>
            <div className="head w-full max-w-4xl flex flex-col items-center">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold cursor-pointer font-[Playfair_Display] mb-4 md:mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                // transition={{ delay: 0.3 }}
              >
                {displayText}
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-[var(--text2)] cursor-pointer font-[Inter] max-w-2xl mb-6 md:mb-8 px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                // transition={{ delay: 1.5 }}
              >
                {subtitle}
              </motion.p>

              <button className="border border-white/10 bg-black/10 hover:bg-white hover:text-black shadow-zinc-600 hover:shadow-lg  transition  rounded cursor-pointer flex"
              data-aos="fade-up"
              data-aos-duration="600"
     data-aos-delay="950"
              >
                <a href="https://drive.google.com/file/d/1BICCIe5nlYR_9mmYsxg1nVO5jdauef0U/view?usp=drive_link"
                className="text-decoreation-none flex p-2 px-4"
                target="_blank"
                >
                  Resume
                <ArrowUpRight />
                </a>  
              </button>
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default Hero;
