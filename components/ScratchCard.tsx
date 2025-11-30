import React, { useRef, useEffect, useState } from 'react';

interface ScratchCardProps {
  onReveal: () => void;
  width?: number;
  height?: number;
  coverColor?: string;
}

const ScratchCard: React.FC<ScratchCardProps> = ({ 
  onReveal, 
  width = 300, 
  height = 150,
  coverColor = '#cbd5e1' // slate-300
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup canvas
    ctx.fillStyle = coverColor;
    ctx.fillRect(0, 0, width, height);
    
    // Add "Scratch Me!" text
    ctx.font = '20px "Fredoka", sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch Here!', width / 2, height / 2);

    // Initial composite operation is source-over to draw the cover
    ctx.globalCompositeOperation = 'source-over';
  }, [width, height, coverColor]);

  const getMousePos = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();

    checkReveal();
  };

  const checkReveal = () => {
    if (isRevealed) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    
    // Check alpha channel (every 4th byte)
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const percentage = (transparentPixels / (pixels.length / 4)) * 100;
    if (percentage > 40) { // If 40% is scratched
      setIsRevealed(true);
      onReveal();
      // Clear the rest smoothly
      canvas.style.transition = 'opacity 0.5s';
      canvas.style.opacity = '0';
    }
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    const { x, y } = getMousePos(e.nativeEvent);
    scratch(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;
    const { x, y } = getMousePos(e.nativeEvent);
    scratch(x, y);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg" style={{ width, height }}>
      {/* Background Content (The Prize) */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 flex flex-col items-center justify-center text-white p-4">
        <p className="font-bold text-lg">Flipkart Voucher</p>
        <p className="text-3xl font-bold my-2">₹500</p>
        <p className="text-xs opacity-75">Code: HIDDEN-ON-PURPOSE</p>
      </div>

      {/* Foreground Canvas (The Scratch Layer) */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute inset-0 cursor-pointer touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      />
    </div>
  );
};

export default ScratchCard;