import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Header } from './components/Header';
import { SlideOverlay } from './components/SlideOverlay';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { PricingModal } from './components/PricingModal';
import { STAGES } from './utils/particleShapes';
import { soundEngine } from './utils/audio';

export default function App() {
  const [currentStage, setCurrentStage] = useState(0);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [lang, setLang] = useState<'ru' | 'en' | 'kk'>('ru');

  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);

  // Transition to a specific stage
  const goToStage = useCallback((index: number) => {
    const nextIdx = Math.max(0, Math.min(STAGES.length - 1, index));
    setCurrentStage(nextIdx);
    soundEngine.onStageChange(nextIdx);
  }, []);

  const nextStage = useCallback(() => {
    goToStage(currentStage + 1);
  }, [currentStage, goToStage]);

  const prevStage = useCallback(() => {
    goToStage(currentStage - 1);
  }, [currentStage, goToStage]);

  // Audio toggle
  const toggleAudio = useCallback(() => {
    const newState = soundEngine.toggle();
    setIsAudioActive(newState);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't navigate slides if user is typing in terminal
      if (isTerminalOpen) {
        if (e.key === 'Escape') setIsTerminalOpen(false);
        return;
      }
      if (isPricingOpen) {
        if (e.key === 'Escape') setIsPricingOpen(false);
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextStage();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevStage();
      } else if (e.key.toLowerCase() === 'm') {
        toggleAudio();
      } else if (e.key.toLowerCase() === 't') {
        setIsTerminalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStage, prevStage, toggleAudio, isTerminalOpen, isPricingOpen]);

  // Mouse wheel slide morphing (debounced like fullpage presentation)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTerminalOpen || isPricingOpen) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 900) return;

      if (Math.abs(e.deltaY) > 30) {
        lastScrollTime.current = now;
        if (e.deltaY > 0) {
          nextStage();
        } else {
          prevStage();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [nextStage, prevStage, isTerminalOpen, isPricingOpen]);

  // Mobile touch swipe
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTerminalOpen || isPricingOpen) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          nextStage();
        } else {
          prevStage();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextStage, prevStage, isTerminalOpen, isPricingOpen]);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlay || isTerminalOpen || isPricingOpen) return;

    const timer = setInterval(() => {
      setCurrentStage((prev) => {
        const next = (prev + 1) % STAGES.length;
        soundEngine.onStageChange(next);
        return next;
      });
    }, 7500);

    return () => clearInterval(timer);
  }, [isAutoPlay, isTerminalOpen, isPricingOpen]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050508] select-none text-[#f5f1ea]">
      {/* 3D WebGL Particle Landscape */}
      <ParticleCanvas currentStage={currentStage} speedMultiplier={1.0} />

      {/* Atmospheric Vignette Overlay */}
      <div className="vignette-overlay absolute inset-0 z-10" />

      {/* Strict 3-Zone Top Navigation Bar */}
      <Header
        currentStage={currentStage}
        onSelectStage={goToStage}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenPricing={() => setIsPricingOpen(true)}
        isAudioActive={isAudioActive}
        onToggleAudio={toggleAudio}
        lang={lang}
        onToggleLang={setLang}
      />

      {/* Cinematic Slide Narrative Overlay */}
      <SlideOverlay
        currentStage={currentStage}
        onNext={nextStage}
        onPrev={prevStage}
        onSelectStage={goToStage}
        onStart={() => {
          if (currentStage === 0) {
            goToStage(1);
          } else {
            setIsTerminalOpen(true);
          }
        }}
        isAutoPlay={isAutoPlay}
        onToggleAutoPlay={() => setIsAutoPlay(!isAutoPlay)}
        lang={lang}
      />

      {/* Interactive AI Terminal Console */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onSetStage={goToStage}
        onOpenPricing={() => {
          setIsTerminalOpen(false);
          setIsPricingOpen(true);
        }}
        lang={lang}
      />

      {/* Pricing / Tiers Modal */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        lang={lang}
      />
    </div>
  );
}
