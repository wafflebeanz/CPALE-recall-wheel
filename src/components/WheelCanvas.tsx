import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TopicItem, SubjectConfig } from '../types';
import { sounds } from '../utils/audio';

interface WheelCanvasProps {
  topics: TopicItem[];
  subject: SubjectConfig;
  onSpinEnd: (topic: TopicItem) => void;
  isSpinning: boolean;
  setIsSpinning: (spinning: boolean) => void;
  soundEnabled: boolean;
  skipAnimation: boolean;
  onSpinStart?: () => void;
}

// Cutesy pastel palette for wheel slices
const SLICE_COLORS = [
  '#FECDD3', // pastel rose
  '#FED7AA', // pastel apricot
  '#FEF08A', // pastel lemon
  '#BBF7D0', // pastel mint
  '#BAE6FD', // pastel sky
  '#DDD6FE', // pastel lavender
  '#FBCFE8', // pastel pink
  '#C7D2FE', // pastel periwinkle
  '#A7F3D0', // pastel emerald
  '#FDE68A', // pastel butter
  '#E9D5FF', // pastel orchid
  '#CFFAFE', // pastel cyan
];

export const WheelCanvas: React.FC<WheelCanvasProps> = ({
  topics,
  subject,
  onSpinEnd,
  isSpinning,
  setIsSpinning,
  soundEnabled,
  skipAnimation,
  onSpinStart,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const lastPegIndexRef = useRef<number>(-1);
  const [currentSelectedTopic, setCurrentSelectedTopic] = useState<TopicItem | null>(null);

  // Draw wheel on canvas
  const drawWheel = useCallback((rotation: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 30;

    ctx.clearRect(0, 0, width, height);

    if (topics.length === 0) {
      // Empty state on canvas
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#FFF1F2';
      ctx.fill();
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#FECDD3';
      ctx.stroke();

      ctx.fillStyle = '#E11D48';
      ctx.font = 'bold 22px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('All Topics Mastered! 🎉', centerX, centerY - 15);

      ctx.fillStyle = '#64748B';
      ctx.font = '15px Nunito, sans-serif';
      ctx.fillText('Uncheck items below to add them back!', centerX, centerY + 20);
      ctx.restore();
      return;
    }

    const numSlices = topics.length;
    const arc = (2 * Math.PI) / numSlices;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);

    // Draw slices
    for (let i = 0; i < numSlices; i++) {
      const angle = i * arc;
      const topic = topics[i];

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, angle, angle + arc);
      ctx.closePath();

      // Background color
      const baseColor = SLICE_COLORS[i % SLICE_COLORS.length];
      ctx.fillStyle = baseColor;
      ctx.fill();

      // Subtle slice separator line
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();

      // Slice Text
      ctx.save();
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      // Text color & label hint
      ctx.fillStyle = '#1E293B';
      ctx.font = numSlices > 25 ? 'bold 11px Nunito, sans-serif' : numSlices > 15 ? 'bold 13px Nunito, sans-serif' : 'bold 15px Nunito, sans-serif';

      // Truncate text if needed
      let displayTitle = topic.title;
      const maxChars = numSlices > 20 ? 18 : 26;
      if (displayTitle.length > maxChars) {
        displayTitle = displayTitle.slice(0, maxChars - 1) + '…';
      }

      // Add indicator emoji if critical or comfortable
      if (topic.label === 'critical') {
        displayTitle = '🚨 ' + displayTitle;
      } else if (topic.label === 'comfortable') {
        displayTitle = '🌿 ' + displayTitle;
      }

      ctx.fillText(displayTitle, radius - 24, 0);
      ctx.restore();
    }

    // Outer decorative rim with cute pastel candy pearls
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius + 5, 0, Math.PI * 2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = subject.accentColor;
    ctx.stroke();

    // Draw outer candy dots
    const numDots = Math.max(16, numSlices * 2);
    for (let d = 0; d < numDots; d++) {
      const dotAngle = (d * (2 * Math.PI)) / numDots;
      const dotX = Math.cos(dotAngle) * (radius + 2);
      const dotY = Math.sin(dotAngle) * (radius + 2);

      ctx.beginPath();
      ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
      ctx.fillStyle = d % 2 === 0 ? '#FFFFFF' : '#FFF7ED';
      ctx.fill();
    }

    ctx.restore();

    // Center Hub (Cute button)
    ctx.save();
    ctx.translate(centerX, centerY);

    // Outer center shadow
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 12;
    ctx.fill();

    // Inner center circle
    ctx.beginPath();
    ctx.arc(0, 0, 40, 0, Math.PI * 2);
    ctx.fillStyle = subject.accentColor;
    ctx.fill();

    // Center text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px Fredoka, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SPIN', 0, -5);

    ctx.font = '12px Fredoka, sans-serif';
    ctx.fillText('✨', 0, 14);

    ctx.restore();

    // Pointer / Flapper Indicator at 3 o'clock (Right edge)
    ctx.save();
    ctx.translate(centerX + radius + 10, centerY);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(24, -14);
    ctx.lineTo(24, 14);
    ctx.closePath();
    ctx.fillStyle = subject.accentColor;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    // Little heart/star detail on pointer
    ctx.beginPath();
    ctx.arc(16, 0, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.restore();
  }, [topics, subject]);

  // Initial draw and redraw on topics/subject change
  useEffect(() => {
    drawWheel(rotationRef.current);
  }, [drawWheel]);

  // Spin physics engine
  const handleSpin = useCallback(() => {
    if (isSpinning || topics.length === 0) return;

    if (onSpinStart) {
      onSpinStart();
    }

    // Skip animation mode: instant selection
    if (skipAnimation) {
      const randomIndex = Math.floor(Math.random() * topics.length);
      const chosen = topics[randomIndex];
      setCurrentSelectedTopic(chosen);
      if (soundEnabled) {
        sounds.playCelebration();
      }
      onSpinEnd(chosen);
      return;
    }

    setIsSpinning(true);

    const numSlices = topics.length;
    const arc = (2 * Math.PI) / numSlices;

    // Pick a random target slice index
    const targetIndex = Math.floor(Math.random() * numSlices);

    // Calculate rotation to land pointer (at angle 0 / 3 o'clock) on targetIndex
    // When pointer is at 0 rad (right), slice i is at angle (i*arc + rotation).
    // Pointer hits slice i when (2*PI - (rotation % 2*PI)) is in [i*arc, (i+1)*arc].
    // Target center angle in wheel space is: targetIndex * arc + arc / 2
    // So rotation = - (targetIndex * arc + arc/2) + extra random offset
    const randomWithinSlice = (Math.random() * 0.7 + 0.15) * arc;
    const desiredFinalAngle = -(targetIndex * arc + randomWithinSlice);

    // Add 6 to 9 full spins for suspense
    const extraSpins = (Math.floor(Math.random() * 4) + 6) * 2 * Math.PI;
    const startRotation = rotationRef.current;
    // Normalize current rotation so we always spin forward smoothly
    const currentNormalized = startRotation % (2 * Math.PI);
    const targetRotation = startRotation + (extraSpins + ((desiredFinalAngle - currentNormalized) % (2 * Math.PI) + 2 * Math.PI));

    const duration = 4800; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Quartic ease out for super smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3.8);
      const currentRotation = startRotation + (targetRotation - startRotation) * easeOut;
      rotationRef.current = currentRotation;

      // Play tick sound when passing a peg
      const currentPeg = Math.floor((currentRotation / arc) % numSlices);
      if (currentPeg !== lastPegIndexRef.current) {
        lastPegIndexRef.current = currentPeg;
        if (soundEnabled) {
          const velocity = 1 - progress;
          sounds.playTick(velocity);
        }
      }

      drawWheel(currentRotation);

      if (progress < 1) {
        animFrameIdRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        const winningTopic = topics[targetIndex];
        setCurrentSelectedTopic(winningTopic);
        if (soundEnabled) {
          sounds.playCelebration();
        }
        onSpinEnd(winningTopic);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(animate);
  }, [isSpinning, topics, skipAnimation, onSpinStart, setIsSpinning, soundEnabled, onSpinEnd, drawWheel]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-3 sm:p-6 w-full max-w-[540px] mx-auto select-none">
      {/* Canvas container with cute glow and frame */}
      <div 
        className="relative group cursor-pointer transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99]"
        onClick={handleSpin}
        title="Click to spin the wheel!"
      >
        <div 
          className="rounded-full p-2 bg-gradient-to-tr shadow-2xl transition-all duration-300"
          style={{
            backgroundImage: `linear-gradient(135deg, ${subject.accentColor}33, #FFFFFF, ${subject.accentColor}22)`,
            boxShadow: `0 20px 45px -10px ${subject.accentColor}44, 0 8px 20px -6px rgba(0,0,0,0.1)`
          }}
        >
          <canvas
            ref={canvasRef}
            width={480}
            height={480}
            className="w-[320px] h-[320px] xs:w-[360px] xs:h-[360px] sm:w-[440px] sm:h-[440px] max-w-full rounded-full bg-white shadow-inner"
          />
        </div>

        {/* Floating tooltip badge */}
        {!isSpinning && topics.length > 0 && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-pink-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 animate-bounce-slow">
            <span>✨ Tap wheel or button to Spin!</span>
          </div>
        )}
      </div>

      {/* Main Big Spin Button */}
      <div className="mt-7 flex items-center gap-3 w-full justify-center">
        <button
          type="button"
          onClick={handleSpin}
          disabled={isSpinning || topics.length === 0}
          className={`px-8 py-3.5 rounded-2xl font-cute text-lg sm:text-xl font-bold text-white shadow-xl flex items-center gap-2.5 transition-all duration-200 transform active:scale-95 ${
            isSpinning || topics.length === 0
              ? 'opacity-50 cursor-not-allowed bg-slate-400 shadow-none'
              : 'hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0'
          }`}
          style={{
            backgroundColor: topics.length === 0 ? '#94A3B8' : subject.accentColor,
            boxShadow: topics.length > 0 ? `0 10px 25px -4px ${subject.accentColor}77` : 'none'
          }}
        >
          {isSpinning ? (
            <>
              <span className="inline-block animate-spin">🎡</span>
              <span>Spinning...</span>
            </>
          ) : topics.length === 0 ? (
            <>
              <span>🌟</span>
              <span>All Mastered!</span>
            </>
          ) : (
            <>
              <span>🎯</span>
              <span>Spin the {subject.name} Wheel!</span>
            </>
          )}
        </button>
      </div>

      {/* Topic Counter Badge */}
      <div className="mt-3 text-xs font-semibold text-slate-500 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span>{topics.length} active topics in wheel</span>
      </div>
    </div>
  );
};
