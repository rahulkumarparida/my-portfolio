import { useEffect, useRef } from "react";

export default function CursorFollowerEyes() {
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  useEffect(() => {
    const moveEyes = (event) => {
      const eyes = [leftEyeRef.current, rightEyeRef.current];
      eyes.forEach((eye) => {
        if (!eye) return;
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);
        const pupil = eye.querySelector(".pupil");

        const moveRadius = 8; // how far the pupil can move
        const pupilX = Math.cos(angle) * moveRadius;
        const pupilY = Math.sin(angle) * moveRadius;

        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
      });
    };

    window.addEventListener("mousemove", moveEyes);
    return () => window.removeEventListener("mousemove", moveEyes);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black">
      {/* Container for both eyes */}
      <div className="flex gap-8">
        {/* Left Eye */}
        <div
          ref={leftEyeRef}
          className="eye w-20 h-20 bg-white rounded-full flex items-center justify-center relative overflow-hidden"
        >
          <div className="pupil w-8 h-8 bg-black rounded-full absolute transition-transform duration-75 ease-linear" />
        </div>

        {/* Right Eye */}
        <div
          ref={rightEyeRef}
          className="eye w-20 h-20 bg-white rounded-full flex items-center justify-center relative overflow-hidden"
        >
          <div className="pupil w-8 h-8 bg-black rounded-full absolute transition-transform duration-75 ease-linear" />
        </div>
      </div>
    </div>
  );
}
