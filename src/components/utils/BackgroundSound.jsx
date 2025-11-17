// import { useEffect, useRef, useState } from "react";
// import { Volume2, VolumeX } from "lucide-react";
// import bgMusic from "../../assets/sounds/bgMusic.mp3";

// const BackgroundSound = () => {
//   const audioRef = useRef(null);
//   const [muted, setMuted] = useState(() => {
//     return localStorage.getItem("bg-muted") === "true";
//   });
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [needsInteraction, setNeedsInteraction] = useState(false);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     audio.volume = 0.45;

//     // Multiple attempts to play audio
//     const attemptPlay = async (attempt = 0) => {
//       try {
//         await audio.play();
//         setIsPlaying(true);
//         setNeedsInteraction(false);
//         console.log("Audio started successfully");
//       } catch (error) {
//         console.log(`Autoplay attempt ${attempt + 1} failed:`, error);

//         if (attempt < 3) {
//           // Retry after a delay
//           setTimeout(() => attemptPlay(attempt + 1), 1000);
//         } else {
//           // Final fallback - wait for user interaction
//           setNeedsInteraction(true);
//           const handleUserInteraction = async () => {
//             try {
//               await audio.play();
//               setIsPlaying(true);
//               setNeedsInteraction(false);
//             } catch (err) {
//               console.error("Final play attempt failed:", err);
//             }
//             document.removeEventListener("click", handleUserInteraction);
//             document.removeEventListener("keydown", handleUserInteraction);
//             document.removeEventListener("touchstart", handleUserInteraction);
//           };

//           document.addEventListener("click", handleUserInteraction, {
//             once: true,
//           });
//           document.addEventListener("keydown", handleUserInteraction, {
//             once: true,
//           });
//           document.addEventListener("touchstart", handleUserInteraction, {
//             once: true,
//           });
//         }
//       }
//     };

//     // Start playing when audio is ready
//     const handleCanPlay = () => {
//       if (!muted) {
//         attemptPlay();
//       } else if (window.onload) {
//         attemptPlay();
//       }
//     };

//     audio.addEventListener("canplay", handleCanPlay);

//     // If audio is already ready, start immediately
//     if (audio.readyState >= 3 && !muted) {
//       attemptPlay();
//     }

//     return () => {
//       if (audio) {
//         audio.removeEventListener("canplay", handleCanPlay);
//         audio.pause();
//       }
//     };
//   }, [muted]);

//   const toggleMute = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const newMute = !muted;
//     setMuted(newMute);
//     localStorage.setItem("bg-muted", newMute.toString());

//     audio.muted = newMute;

//     // If unmuting, try to play
//     if (!newMute && audio.paused) {
//       audio
//         .play()
//         .then(() => {
//           setIsPlaying(true);
//         })
//         .catch((error) => {
//           console.error("Failed to play when unmuting:", error);
//           setNeedsInteraction(true);
//         });
//     }
//   };

//   return (
//     <>
//       <audio ref={audioRef} src={bgMusic} loop preload="auto" muted={muted} />

//       <button
//         onClick={toggleMute}
//         className="fixed bottom-6 right-6 z-[9999] bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-3 hover:bg-white/20 transition-all duration-300 text-white group"
//         title={muted ? "Unmute background music" : "Mute background music"}
//       >
//         {muted ? (
//           <VolumeX size={22} className="text-gray-400" />
//         ) : (
//           <Volume2
//             size={22}
//             className={isPlaying ? "text-green-400" : "text-yellow-400"}
//           />
//         )}

//         {/* Status indicator */}
//         <div
//           className={`absolute -top-1 -right-1 w-3 h-3 rounded-full transition-all duration-300 ${
//             isPlaying && !muted
//               ? "bg-green-400 animate-pulse"
//               : needsInteraction
//               ? "bg-yellow-400 animate-pulse"
//               : "bg-gray-500"
//           }`}
//         />

//         <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
//           {muted ? "Unmute" : "Mute"}
//         </div>
//       </button>

//       {/* Interaction prompt */}
//       {needsInteraction && (
//         <div className="fixed bottom-20 right-6 z-[9999] px-3 py-2 bg-yellow-500/90 text-black text-sm rounded-lg animate-bounce shadow-lg">
//           🔇 Click anywhere to enable audio
//         </div>
//       )}
//     </>
//   );
// };

// export default BackgroundSound;
