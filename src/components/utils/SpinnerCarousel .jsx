import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundLight from "./BackgroundLight";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

const ProjectsCarousel = ({ projects = [], autoScrollInterval = 5000 }) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  
  const autoScrollRef = useRef(null);

  // If no projects, return nothing
  if (projects.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 text-center">
        <p className="text-gray-400 text-lg">No projects to display</p>
      </div>
    );
  }

  const currentProject = projects[currentProjectIndex];
  const {
    thumbnail,
    title,
    description,
    github_url,
    project_url,
    date,
    tags,
    project_img_arr = []
  } = currentProject;

  // Auto-scroll functionality
  useEffect(() => {
    if (projects.length <= 1 || isAutoScrollPaused) return;

    autoScrollRef.current = setInterval(() => {
      setCurrentProjectIndex((prev) => 
        prev === projects.length - 1 ? 0 : prev + 1
      );
      setCurrentImageIndex(0);
    }, autoScrollInterval);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [projects.length, autoScrollInterval, isAutoScrollPaused]);

  // Project navigation
  const nextProject = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
    setCurrentProjectIndex((prev) => 
      prev === projects.length - 1 ? 0 : prev + 1
    );
    setCurrentImageIndex(0);
  };

  const prevProject = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
    setCurrentProjectIndex((prev) => 
      prev === 0 ? projects.length - 1 : prev - 1
    );
    setCurrentImageIndex(0);
  };

  // Image navigation within current project
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project_img_arr.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project_img_arr.length - 1 : prev - 1
    );
  };

  const openImageModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const goToProject = (index) => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
    setCurrentProjectIndex(index);
    setCurrentImageIndex(0);
  };

  const toggleAutoScroll = () => {
    setIsAutoScrollPaused(!isAutoScrollPaused);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div 
      className="w-full max-w-6xl mx-auto   backdrop-blur-lg rounded-2xl  overflow-hidden shadow-2xl"
      onClick={() => setIsAutoScrollPaused(!isAutoScrollPaused)}
      // onClick={() => setIsAutoScrollPaused(false)}
    >
      
      {/* Project Navigation Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 border-b border-white/10 gap-4 sm:gap-0" data-aos="fade-down" data-aos-duration="600" >
        <div className="flex items-center gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white" >Projects</h2>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{currentProjectIndex + 1}</span>
            <span>/</span>
            <span>{projects.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-3" data-aos="fade-down" data-aos-duration="1000">
          {/* Auto-scroll Toggle */}
          {projects.length > 1 && (
            <button
              onClick={toggleAutoScroll}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              title={isAutoScrollPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isAutoScrollPaused ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>
          )}

          {/* Previous Project Button */}
          <button
            onClick={prevProject}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={projects.length <= 1}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Project Button */}
          <button
            onClick={nextProject}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={projects.length <= 1}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          
        </div>
      </div>

      {/* Project Dots Indicator */}
      {projects.length > 1 && (
        <div className="flex justify-center gap-2 p-3 sm:p-4 border-b border-white/10">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                index === currentProjectIndex 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
             
            />
          ))}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 md:p-8">
       
        {/* Left Side - Project Details */}
        <div className="space-y-4 sm:space-y-6"  data-aos="fade-right">
          {/* Thumbnail */}
          <div className="relative group">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-48 sm:h-56 md:h-60   object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-xl" />
          </div>

          {/* Project Information */}
          <div className="space-y-3 sm:space-y-4" data-aos="fade-up" data-aos-duration="1000">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{description}</p>
            
            {/* Links */}
            <div className="flex flex-wrap gap-3 pt-2"data-aos="fade-up" data-aos-duration="1300">
              <a
                href={github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              
              <a
                href={project_url !== "NA" ? project_url : "#"}
                target={project_url !== "NA" ? "_blank" : "_self"}
                rel={project_url !== "NA" ? "noopener noreferrer" : ""}
                className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
                  project_url !== "NA" 
                    ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-300" 
                    : "bg-gray-500/20 text-gray-400 cursor-not-allowed"
                }`}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {project_url !== "NA" ? "Live Demo" : "N/A"}
              </a>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-gray-400 text-sm sm:text-base" data-aos="fade-up" data-aos-duration="1400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(date)}</span>
            </div>

          
          </div>
        </div>

        {/* Right Side - Image Gallery */}
        <div className="space-y-4" data-aos="fade-left" >
          {/* Main Carousel Image */}
          <div className="relative group">
            <img
              src={project_img_arr[currentImageIndex]}
              alt={`${title} ${currentImageIndex + 1}`}
              className="w-full h-60 sm:h-72 md:h-80 object-cover rounded-xl shadow-lg cursor-pointer"
              onClick={() => openImageModal(currentImageIndex)}
            />
            
            {/* Navigation Arrows */}
            {project_img_arr.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2  hover:bg-black/70 text-white p-1 sm:p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2  hover:bg-black/70 text-white p-1 sm:p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image Counter */}
            {project_img_arr.length > 1 && (
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2   text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                {currentImageIndex + 1} / {project_img_arr.length}
              </div>
            )}
          </div>

          {/* Image Grid Thumbnails */}
          {project_img_arr.length > 0 && (
            <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-1 sm:gap-2" data-aos="fade-up" data-aos-duration="1000">
              {project_img_arr.map((img, index) => (
                <div
                  key={index}
                  className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex ? 'border-blue-500' : 'border-transparent'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={img}
                    alt={`${title} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 ${
                    index === currentImageIndex ? 'bg-blue-500/20' : 'bg-black/0 hover:bg-black/20'
                  } transition-all`} />
                </div>
              ))}
            </div>
          )}
            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2" data-aos="fade-up" data-aos-duration="1300">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 sm:px-3 sm:py-1 bg-white/10 rounded-full text-xs sm:text-sm text-gray-300 border border-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
        </div>
        
      </div>

      {/* Modal for Fullscreen Image View */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={project_img_arr[currentImageIndex]}
                alt={`${title} fullscreen`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4  hover:bg-black/70 text-white p-1 sm:p-2 rounded-full transition-all"
              >
                <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {project_img_arr.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2  hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all"
                  >
                    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2  hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all"
                  >
                    <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsCarousel;