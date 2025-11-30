import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VIDEO_EMBED_URL } from '../constants';

interface VideoStageProps {
  onComplete: () => void;
}

const VideoStage: React.FC<VideoStageProps> = ({ onComplete }) => {
  const [videoEnded, setVideoEnded] = useState(false);

  // In a real Google Drive Embed scenario, detecting 'ended' event is hard due to cross-origin iframes.
  // We will simply show the arrow after a set delay (e.g., 5 seconds) or immediately, 
  // letting the user click it when they are done.
  // Here, we simulate a delay for the arrow to appear.
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVideoEnded(true);
    }, 5000); // Show arrow after 5 seconds of presence
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="h-screen w-full flex flex-col items-center justify-center bg-indigo-900 relative p-4"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: "easeInOut" } }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* 9:16 Aspect Ratio Container - Controlled by height to fit screen */}
      <div className="relative h-[70vh] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-indigo-300/20">
        <iframe 
          src={VIDEO_EMBED_URL} 
          title="Birthday Video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-indigo-200 mt-6 text-center max-w-md"
      >
        A little something I made for you...
      </motion.p>

      {videoEnded && (
        <motion.button
          onClick={onComplete}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white drop-shadow-lg"
        >
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5} 
            stroke="currentColor" 
            className="w-12 h-12" 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </motion.svg>
        </motion.button>
      )}
    </motion.div>
  );
};

export default VideoStage;