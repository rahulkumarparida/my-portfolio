import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import SplitType from "split-type";
import { Element } from "react-scroll";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

export default function About() {
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // 🔥 Scramble "ABOUT ME"
    gsap.fromTo(
      titleRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        scrambleText: {
          text: "ABOUT ME",
          chars: "upperCase",
          speed: 0.6,
        },
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // 🔥 LINE ANIMATION FOR PARAGRAPH
    const split = new SplitType(textRef.current, {
      types: "lines",
      lineClass: "line-child", // helps styling
    });

    gsap.from(split.lines, {
      opacity: 0,
      y: 25,
      duration: 0.5,
      stagger: 0.15, // line delay
      ease: "power3.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    return () => split.revert();
  }, []);

  return (
    <Element name="About Me" className="md:pt-30 p-8 md:mb-10 flex items-start justify-center flex-col">
      {/* TITLE */}
      <div className="text-[var(--text1)] text-5xl font-[Playfair_Display]"   data-aos="fade-up" data-aos-duration="800">
        <p ref={titleRef}></p>
      </div>

      {/* CONTENT */}
      <div className="w-full max-w-[800px] mx-auto flex flex-col md:gap-10 py-8 md:py-20">
        <p
          ref={textRef}
          className="text-[#dfdcff] text-start text-xs md:text-lg md:leading-[1.5] font-mono"
           data-aos="fade-up" data-aos-duration="1200"
        >
          Hey! I’m Rahul — a backend developer who genuinely enjoys making
          computers do things they initially refuse to do. I work with Django,
          DRF, and PostgreSQL, building APIs that (most of the time) behave
          exactly as intended. I love creating systems that run smoothly in the
          background — the kind of stuff users never see but depend on every
          second. If you’ve ever wondered who quietly keeps everything running
          while the frontend gets all the applause… yeah, that’s us. When I’m
          not writing code, I’m usually imagining random stories, exploring cool
          tech ideas, or appreciating food like it’s a reward for surviving
          another debugging session. I believe great software is built with
          equal parts logic, curiosity, and a good laugh in between. If you’re
          here reading this — welcome! I hope this place makes you smile and
          maybe sparks the same excitement I feel every time I build something
          new.
        </p>
      </div>
    </Element>
  );
}
