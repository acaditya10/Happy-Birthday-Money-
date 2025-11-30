import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import ScratchCard from './ScratchCard';
import { GiftState } from '../types';
import { WHATSAPP_LINK } from '../constants';

const GiftStage: React.FC = () => {
  const [giftState, setGiftState] = useState<GiftState>(GiftState.PROMPT);
  const [countdown, setCountdown] = useState(5);

  const handleReveal = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
    // Slight delay to let them see the scratched result properly before showing button
    setTimeout(() => {
      setGiftState(GiftState.REDEEM_PROMPT);
    }, 1000);
  };

  const handleRedeemClick = () => {
    setGiftState(GiftState.PRANK);
  };

  useEffect(() => {
    if (giftState === GiftState.PRANK) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            window.location.href = WHATSAPP_LINK;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [giftState]);

  return (
    <motion.div 
      className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-rose-200 relative p-6 overflow-hidden"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="max-w-md w-full flex flex-col items-center text-center">
        
        <AnimatePresence mode="wait">
          {giftState === GiftState.PROMPT && (
            <motion.div 
              key="prompt"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="flex flex-col items-center space-y-8"
            >
              <h2 className="text-4xl font-bold text-rose-600">Ready for the gift? 🎁</h2>
              <motion.button
                onClick={() => setGiftState(GiftState.SCRATCH)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-rose-500 text-white text-xl rounded-full shadow-lg font-bold hover:bg-rose-600 transition-colors"
              >
                Yes!
              </motion.button>
            </motion.div>
          )}

          {giftState === GiftState.SCRATCH && (
            <motion.div 
              key="scratch"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }} // Keep it visible during transition if needed, or animate out
              className="flex flex-col items-center"
            >
              <h3 className="text-2xl font-bold text-slate-700 mb-6">Scratch to reveal! ✨</h3>
              <ScratchCard onReveal={handleReveal} />
            </motion.div>
          )}

          {giftState === GiftState.REDEEM_PROMPT && (
            <motion.div
              key="redeem"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center mt-8 space-y-6"
            >
              {/* We show the scratched card result just visually above if we didn't unmount it, 
                  but for simplicity in 'mode=wait', we might render a static image of the voucher here 
                  OR just text. Let's assume the user knows what they saw. 
                  Actually, let's keep the voucher visible by nesting or changing structure. 
                  But strictly following the flow: */}
               <div className="p-4 bg-white rounded-lg shadow-md mb-4 border border-blue-200">
                  <p className="text-blue-600 font-bold text-xl">Flipkart ₹500 Voucher</p>
                  <p className="text-sm text-gray-400">Code: **********</p>
               </div>

              <h3 className="text-2xl font-bold text-slate-800">Wanna redeem it now? 🛍️</h3>
              <motion.button
                onClick={handleRedeemClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-emerald-500 text-white text-lg rounded-full shadow-lg font-bold hover:bg-emerald-600 transition-colors"
              >
                Redeem Now
              </motion.button>
            </motion.div>
          )}

          {giftState === GiftState.PRANK && (
            <motion.div
              key="prank"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              className="flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-rose-300"
            >
              <div className="text-6xl mb-4">🤣</div>
              <h2 className="text-2xl md:text-3xl font-bold text-rose-600 mb-4 leading-tight">
                Ab ye to bhaiya hee karega!
              </h2>
              <p className="text-gray-600 mb-6">Redirecting to chat in {countdown}...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default GiftStage;