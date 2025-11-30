import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HERO_IMAGE_URL } from '../constants';

interface PhotoStageProps {
  onComplete: () => void;
}

const PhotoStage: React.FC<PhotoStageProps> = ({ onComplete }) => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrow(true);
    }, 3000); // Wait 3 seconds before showing arrow

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="h-screen w-full flex flex-col items-center justify-center relative bg-rose-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="relative w-full h-full max-w-md mx-auto overflow-hidden shadow-2xl">
        <img 
          src={HERO_IMAGE_URL} 
          alt="Birthday Girl" 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-8 pb-20">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-white text-center"
          >
            Happy Birthday!
          </motion.h1>
          <motion.p
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.8 }}
             className="text-white/90 text-center mt-2"
          >
            Alankrita.
          </motion.p>
        </div>
      </div>

      {showArrow && (
        <motion.button
          onClick={onComplete}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white drop-shadow-lg"
        >
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
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

export default PhotoStage;