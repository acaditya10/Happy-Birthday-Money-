import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppStage } from './types';
import PhotoStage from './components/PhotoStage';
import VideoStage from './components/VideoStage';
import GiftStage from './components/GiftStage';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.PHOTO);

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="sync">
        {stage === AppStage.PHOTO && (
          <PhotoStage 
            key="photo" 
            onComplete={() => setStage(AppStage.VIDEO)} 
          />
        )}
        
        {stage === AppStage.VIDEO && (
          <VideoStage 
            key="video" 
            onComplete={() => setStage(AppStage.GIFT)} 
          />
        )}

        {stage === AppStage.GIFT && (
          <GiftStage 
            key="gift" 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;