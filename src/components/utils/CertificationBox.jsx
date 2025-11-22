import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Sub-Component: Handles individual Category Rows and Hover Scroll ---
const CategoryRow = ({ title, items, onSelect }) => {
  const rowRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const animationFrameId = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP Entrance Animation for this specific row
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(rowRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 85%",
        },
      });
    }, rowRef);
    return () => ctx.revert();
  }, []);

  // --- Logic: Hover to Auto-Scroll (Desktop only) ---
  const startScrolling = () => {
    if (isMobile) return; // Disable hover scroll on mobile
    
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollSpeed = 1.3;

    const step = () => {
      if (
        container.scrollLeft + container.clientWidth <
        container.scrollWidth
      ) {
        container.scrollLeft += scrollSpeed;
        animationFrameId.current = requestAnimationFrame(step);
      }
    };
    animationFrameId.current = requestAnimationFrame(step);
  };

  const stopScrolling = () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div
      ref={rowRef}
      onMouseEnter={startScrolling}
      onMouseLeave={stopScrolling}
      className="border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col gap-3 md:gap-4 hover:border-white/30 transition-colors duration-300"
    >
      <div className="flex justify-between items-end mb-1 md:mb-2">
        <h2 className="text-white text-lg md:text-xl font-bold tracking-wide">{title}</h2>
        <span className="text-gray-500 text-xs uppercase tracking-wider font-medium">
          {items.length} {items.length === 1 ? 'Credential' : 'Credentials'}
        </span>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3 md:gap-4 overflow-x-auto pb-3 md:pb-4 scrollbar-hide select-none touch-pan-x"
        style={{ 
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onSelect(item)}
            className="group relative min-w-[120px] max-w-[120px] h-[90px] md:min-w-[160px] md:max-w-[160px] md:h-[110px] rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1a] flex-shrink-0 cursor-pointer active:scale-95 transition-transform duration-200"
          >
            {/* Hover Effect Overlay - Hidden on mobile for better touch experience */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 md:flex hidden">
              <span className="text-white text-xs font-medium px-2 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                View
              </span>
            </div>

            {/* Touch Indicator for Mobile */}
            <div className="absolute inset-0 bg-black/20 opacity-100 md:opacity-0 flex items-center justify-center z-5 md:hidden">
              <span className="text-white text-xs font-medium px-2 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                Tap to View
              </span>
            </div>

            {/* Image */}
            <img
              src={item.images[0]}
              alt={item.Name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Sub-Component: Modal Popup ---
const CertificateModal = ({ cert, onClose }) => {
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);

  useEffect(() => {
    // Pop-in animation
    gsap.fromTo(
      modalRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
    );

    // Prevent background scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!cert) return null;

  const hasLink = cert.link && cert.link !== "N/A";

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-black/80 backdrop-blur-sm"
    >
      <div
        ref={modalContentRef}
        className="bg-[#1a1a1a] border border-white/10 p-4 md:p-6 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto flex flex-col gap-4 md:gap-5 shadow-2xl relative"
      >
        {/* Close Button (Top Right) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-white transition-colors text-lg md:text-base z-10 bg-[#1a1a1a] rounded-full w-6 h-6 flex items-center justify-center"
        >
          ✕
        </button>

        <h3 className="text-lg md:text-xl text-white font-bold pr-8">{cert.Name}</h3>
        
        <div className="rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
          <img
            src={cert.images[0]}
            alt={cert.Name}
            className="w-full h-auto object-cover max-h-[50vh] md:max-h-[60vh]"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-3 mt-2">
          {hasLink ? (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white text-black font-bold py-3 md:py-2 rounded-lg text-center hover:bg-gray-200 transition-colors text-sm md:text-base"
            >
              Verify Credential
            </a>
          ) : (
            <button
              disabled
              className="flex-1 bg-gray-700 text-gray-400 font-bold py-3 md:py-2 rounded-lg cursor-not-allowed text-sm md:text-base"
            >
              Link N/A
            </button>
          )}
          
          <button
            onClick={onClose}
            className="flex-1 border border-white/20 text-white font-bold py-3 md:py-2 rounded-lg hover:bg-white/10 transition-colors text-sm md:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
export default function CertificationBox({ certificate = defaultCertData }) {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <div className="w-full bg-black py-8 md:py-12 relative">
      {/* Hide Scrollbar CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 md:px-10">
        <CategoryRow
          title="Other Certifications"
          items={certificate.others}
          onSelect={setSelectedCert}
        />
        <CategoryRow
          title="Meta Certifications"
          items={certificate.meta}
          onSelect={setSelectedCert}
        />
        <CategoryRow
          title="GSSoC Achievements"
          items={certificate.gssoc}
          onSelect={setSelectedCert}
        />
        <CategoryRow
          title="Google AI Certifications"
          items={certificate.google}
          onSelect={setSelectedCert}
        />
      </div>

      {/* Modal Overlay */}
      {selectedCert && (
        <CertificateModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </div>
  );
}

// --- Data (Kept same as previous) ---
const defaultCertData = {
  others: [
    {
      provider: "freecodecamp",
      Name: "Responsive Web Design V8 Certification",
      category: "Front-End",
      link: "https://www.freecodecamp.org/certification/rahulroxx460/responsive-web-design",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763650575/Profile___freeCodeCamp.org_-_Google_Chrome_20-11-2025_19_19_45_j5mhs4.png",
      ],
    },
    {
      provider: "AWS Forage",
      Name: "Solution Architecture Job Simulation",
      category: "Solution Architecture",
      link: "N/A",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763650873/8_aes8hv.jpg",
      ],
    },
    {
      provider: "Postman",
      Name: "Postman API Fundementals",
      category: "API Testing",
      link: "N/A",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763650875/10_oyhisy.jpg",
      ],
    },
    {
      provider: "Tutedude",
      Name: "Programming with Python(Django)",
      category: "Backend Developement",
      link: "N/A",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763650878/12_thflf3.jpg",
      ],
    },
  ],
  meta: [
    {
      provider: "Meta",
      Name: "HTML and CSS in Depth",
      category: "Front-End",
      link: "https://coursera.org/account/accomplishments/verify/48FNJMRV9JOE",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763650519/1_sjcm4p.jpg",
      ],
    },
    {
      provider: "Meta",
      Name: "Introduction to Frontend Developement",
      category: "Front-End",
      link: "https://coursera.org/account/accomplishments/verify/KFRFMB6M0SOM",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763650519/2_eudzx3.jpg",
      ],
    },
    {
      provider: "Meta",
      Name: "Introduction to Backend Developement",
      category: "Backend-End",
      link: "https://www.coursera.org/account/accomplishments/verify/WK29RLUNL1R0",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763650518/3_ddshsn.jpg",
      ],
    },
    {
      provider: "Meta",
      Name: "Version Control",
      category: "Github",
      link: "https://www.coursera.org/account/accomplishments/verify/9MYN0FIQA40O",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763650518/5_alyo2i.jpg",
      ],
    },
    {
      provider: "Meta",
      Name: "Programming with Javascript",
      category: "Front-End",
      link: "https://www.coursera.org/account/accomplishments/verify/1RGE5MT8020Y",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763650518/4_hoois4.jpg",
      ],
    },
    {
      provider: "Meta",
      Name: "React Basics",
      category: "Front-End",
      link: "https://www.coursera.org/account/accomplishments/verify/E27DPSA2ZVB0",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763650516/7_xbxt9z.jpg",
      ],
    },
    {
      provider: "Meta",
      Name: "React Advanced",
      category: "Front-End",
      link: "https://www.coursera.org/account/accomplishments/verify/CI7OOF5925W9",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763650517/6_fy003y.jpg",
      ],
    },
  ],
  gssoc: [
    {
      provider: "GirlScript Foundation",
      Name: "GSsoc 2024 Extd.",
      category: "Open Source Contribution",
      link: "N/A",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763651169/Rahul_Kumar_Parida_Cert_Contributor_GSSoC2024Extd_dphkzj.png",
      ],
    },
    {
      provider: "GirlScript Foundation",
      Name: "Champion Badge",
      category: "Open Source Contribution",
      link: "N/A",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763651081/Gssoc-2024_Champion_Badge_ig70hq.png",
      ],
    },
    {
      provider: "GirlScript Foundation",
      Name: "Postman Badge",
      category: "Open Source Contribution",
      link: "N/A",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763651047/Gssoc-2024_Postman_Badge_puug87.png",
      ],
    },
    {
      provider: "GirlScript Foundation",
      Name: "Adventurer Badge",
      category: "Open Source Contribution",
      link: "N/A",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763651090/Gssoc-2024_Adventure_Badge_vknhc4.png",
      ],
    },
    {
      provider: "GirlScript Foundation",
      Name: "Trailblazer Badge",
      category: "Open Source Contribution",
      link: "N/A",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763651217/Gssoc-2024_Trailblazer_Badge_mibp13.png",
      ],
    },
    {
      provider: "GirlScript Foundation",
      Name: "Web3Hack Badge",
      category: "Open Source Contribution",
      link: "N/A",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763651220/Gssoc-2024_Web3_Hack_Badge_v4rka7.png",
      ],
    },
    {
      provider: "GirlScript Foundation",
      Name: "Explorer Badge",
      category: "Open Source Contribution",
      link: "N/A",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763651222/Gssoc-2024_Explorer_Badge_volpz0.png",
      ],
    },
    {
      provider: "GirlScript Foundation",
      Name: "Summit Seeker Badge",
      category: "Open Source Contribution",
      link: "N/A",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763651246/Gssoc-2024_Sumit_Seeker_Badge_afvezt.png",
      ],
    },
  ],
  google: [
    {
      provider: "Google",
      Name: "Introduction to Generative AI",
      category: "AI",
      link: "https://www.coursera.org/account/accomplishments/verify/ETJKF97Q8V7E",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763651406/13_ufjllc.jpg",
      ],
    },
    {
      provider: "Google",
      Name: "Introduction to Large Language Models",
      category: "AI",
      link: "https://www.coursera.org/account/accomplishments/verify/J7NRHDWHMPFI",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763651405/14_gkwnpt.jpg",
      ],
    },
    {
      provider: "Google",
      Name: "Introduction to Responsible AI",
      category: "AI",
      link: "https://www.coursera.org/account/accomplishments/verify/HR0QR6Q4UCSW",
      images: [
        "https://res.cloudinary.com/dr43lpbzz/image/upload/v1763651405/15_sao5uy.jpg",
      ],
    },
  ],
};