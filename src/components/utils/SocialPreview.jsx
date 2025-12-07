// SocialProfileHover.jsx
import React, { useState } from 'react';

const SocialProfileHover = () => {
  const [activeId, setActiveId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Social media data
  const socialProfiles = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      profileUrl: 'https://linkedin.com/in/yourprofile'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      profileUrl: 'https://github.com/yourusername'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      profileUrl: 'https://twitter.com/yourhandle'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      profileImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      profileUrl: 'https://instagram.com/yourprofile'
    }
  ];

  // Detect mobile on mount
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleIconClick = (id) => {
    if (isMobile) {
      setActiveId(activeId === id ? null : id);
    }
  };

  const handleProfileClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-0">
          Connect with me
        </h2>
        
        <div className="flex flex-wrap justify-center gap-6">
          {socialProfiles.map((profile) => (
            <div
              key={profile.id}
              className="relative group"
              onMouseEnter={() => !isMobile && setActiveId(profile.id)}
              onMouseLeave={() => !isMobile && setActiveId(null)}
            >
              {/* Social Icon Button */}
              <button
                onClick={() => handleIconClick(profile.id)}
                className={`
                  relative z-20 w-14 h-14 rounded-full flex items-center justify-center
                  transition-all duration-300 transform
                  ${activeId === profile.id 
                    ? 'scale-110 bg-white text-gray-900 shadow-2xl' 
                    : 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-105 shadow-lg'
                  }
                `}
                aria-label={`${profile.name} profile`}
              >
                {profile.icon}
              </button>

              {/* Profile Card */}
              <div
                className={`
                  absolute z-10 left-1/2 -translate-x-1/2 md:left-auto md:right-full md:translate-x-0
                  mb-4 md:mb-0 md:mr-4 bottom-full md:bottom-1/2 md:translate-y-1/2
                  transition-all duration-300 ease-out
                  ${activeId === profile.id
                    ? 'opacity-100 visible scale-100 translate-y-0'
                    : 'opacity-0 invisible scale-95 translate-y-2'
                  }
                `}
              >
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-64 transform transition-transform hover:scale-105">
                  {/* Profile Image */}
                  <div className="relative h-40 bg-gradient-to-r from-blue-500 to-purple-600">
                    <img
                      src={profile.profileImage}
                      alt={`${profile.name} profile`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Platform Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                        <div className="w-6 h-6 text-white">
                          {profile.icon}
                        </div>
                      </div>
                      <span className="text-white font-semibold text-lg">
                        {profile.name}
                      </span>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Your Name
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {profile.id === 'linkedin' && 'Senior Software Engineer | React Specialist'}
                      {profile.id === 'github' && 'Open Source Contributor | Full Stack Developer'}
                      {profile.id === 'twitter' && 'Tech Enthusiast | Sharing insights daily'}
                      {profile.id === 'instagram' && 'Behind the scenes & creative process'}
                    </p>
                    
                    <button
                      onClick={() => handleProfileClick(profile.profileUrl)}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      View Profile
                    </button>
                  </div>
                </div>

                {/* Arrow/Connector */}
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1">
                  <div className="w-4 h-4 bg-white transform rotate-45" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Instructions */}
      {isMobile && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full">
          <p className="flex items-center gap-2">
            <span className="text-lg">👇</span>
            Tap icons to view profiles
          </p>
        </div>
      )}
    </div>
  );
};

export default SocialProfileHover;