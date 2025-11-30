import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VIDEO_EMBED_URL } from '../constants';

interface VideoStageProps {
  onComplete: () => void;
}

const VideoStage: React.FC<VideoStageProps> = ({ onComplete }) => {
  const [videoEnded, setVideoEnded] = useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVideoEnded(true);
    }, 5000); // Show arrow after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="h-screen w-full flex flex-col items-center justify-center bg-indigo-950 p-4"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: "easeInOut" } }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* 9:16 Aspect Ratio Frame */}
      <div className="relative w-full max-w-[400px] aspect-[9/16] max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 mx-auto">
        <iframe 
          src={VIDEO_EMBED_URL} 
          title="Birthday Video"
          className="w-full h-full object-cover"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>

        {/* Text Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute top-4 left-0 right-0 p-4 text-center pointer-events-none"
        >
          <p className="text-white/90 text-sm font-medium tracking-wide drop-shadow-md bg-black/20 backdrop-blur-sm py-1 px-3 rounded-full inline-block">
            A memory for you...
          </p>
        </motion.div>

        {/* Centered Arrow Button Inside the Frame */}
        {videoEnded && (
          <motion.button
            onClick={onComplete}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 text-white drop-shadow-lg flex flex-col items-center gap-1 group outline-none"
          >
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-12 h-12 opacity-90 group-hover:opacity-100" 
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </motion.svg>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default VideoStage;