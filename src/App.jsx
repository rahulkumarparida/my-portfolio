import React from 'react'
import Routing from "./routing/Routing.jsx"
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { Cursor } from "motion-plus/react"


const App = () => {

  
  useEffect(() => {
    // 1️⃣ Initialize Lenis
    const lenis = new Lenis({
      duration: 1.9, // scroll speed (higher = slower, smoother)
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
    
    <div>
{/* <Cursor /> */}

<Routing className="z-[2]"/>  

    </div>
  )
}

export default App