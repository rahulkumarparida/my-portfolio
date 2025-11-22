import Hero from "../context/Hero";
import TechStackOrbit from "../context/TechStackOrbit";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import BackgroundLight from "../components/utils/BackgroundLight";
import Projects from "../context/Projects";
import ChatBox from "../components/utils/ChatBox";
import About from "../context/About";
import Certifications from "../context/Certifications";

const Applayout = () => {
  useEffect(() => {
    // 1️⃣ Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // scroll speed (higher = slower, smoother)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // default easing
      smoothWheel: true,
    });

    // 2️⃣ Use requestAnimationFrame to drive scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 3️⃣ Cleanup when unmounted
    return () => lenis.destroy();
  }, [])


  return (
    <div className="min-h-screen w-screen bg-black flex flex-col items-center justify-center  ">
   <BackgroundLight/>
   {/* Hero */}
      <Hero/>
      {/* About */}
      <About/>
      {/* projects */}
      <Projects/>
      {/* Teck stack */}
      <TechStackOrbit/>
      {/* Certifications */}
      <Certifications />
      
        {/* Chatbox */}
        <div className="w-[80%] mt-40 m-10 flex justify-center "> 
          <ChatBox/>
        </div>
    </div>
  );
};
 
export default Applayout;
