import React, { useState, useEffect, useCallback, useRef, Component, ErrorInfo, ReactNode } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Header } from './components/Header';
import { SlideOverlay } from './components/SlideOverlay';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { PricingModal } from './components/PricingModal';
import { STAGES } from './utils/particleShapes';
import { soundEngine } from './utils/audio';
import { Eye, EyeOff, RotateCcw, Terminal } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-screen h-screen bg-[#050508] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
            <RotateCcw className="w-6 h-6 animate-spin" />
          </div>
          <h2 className="text-xl font-bold font-display">KentaevAI перезапускается...</h2>
          <p className="text-xs text-white/60 max-w-sm">
            Произошло переключение графического контекста. Нажмите кнопку ниже для обновления.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
          >
            Перезагрузить страницу
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [currentStage, setCurrentStage] = useState(0);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [lang, setLang] = useState<'ru' | 'en' | 'kk'>('ru');
  const [particleSpeed, setParticleSpeed] = useState(1.0);
  const [particleMode, setParticleMode] = useState<'repel' | 'attract' | 'vortex'>('repel');

  const lastScrollTime = useRef(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const lastTapTime = useRef(0);

  const isInteractiveTarget = (target: EventTarget | null) => {
    if (!target || !(target instanceof HTMLElement)) return false;
    return target.closest('button, input, textarea, a, select, [role="button"], form') != null;
  };

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
      } else if (e.key.toLowerCase() === 'f') {
        setIsFocusMode((v) => !v);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStage, prevStage, toggleAudio, isTerminalOpen, isPricingOpen]);

  // Mouse wheel slide morphing
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

  // Mobile multi-directional touch swipe
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (isInteractiveTarget(e.target)) return;
      if (e.touches.length > 0) {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTerminalOpen || isPricingOpen) return;
      if (isInteractiveTarget(e.target)) return;

      // Double-tap detection
      const now = Date.now();
      if (now - lastTapTime.current < 280) {
        setIsFocusMode((v) => !v);
        soundEngine.playInteraction();
      }
      lastTapTime.current = now;

      if (e.changedTouches.length === 0) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const deltaX = touchStartX.current - touchEndX;
      const deltaY = touchStartY.current - touchEndY;

      // Horizontal swipe priority
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
        if (deltaX > 0) {
          nextStage();
        } else {
          prevStage();
        }
      } else if (Math.abs(deltaY) > 50) {
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
    <ErrorBoundary>
      <div className="relative w-screen h-screen overflow-hidden bg-[#050508] text-[#f5f1ea]">
        {/* 3D WebGL Particle Landscape */}
        <ParticleCanvas
          currentStage={currentStage}
          speedMultiplier={particleSpeed}
          interactionMode={particleMode}
        />

        {/* Atmospheric Vignette Overlay */}
        <div className="vignette-overlay absolute inset-0 z-10" />

        {/* Top Navigation Bar */}
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
        {!isFocusMode && (
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
        )}

        {/* Focus Mode floating pill button (Zen Mode) */}
        <div className="absolute right-4 bottom-20 sm:bottom-24 z-30 pointer-events-auto">
          <button
            onClick={() => {
              soundEngine.playInteraction();
              setIsFocusMode((v) => !v);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[11px] font-mono-data text-white/70 hover:text-white transition-all min-h-[44px]"
            title={isFocusMode ? 'Show text' : 'Pure particle focus'}
          >
            {isFocusMode ? (
              <>
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>{lang === 'kk' ? 'МӘТІН' : lang === 'ru' ? 'ТЕКСТ' : 'TEXT'}</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-white/50" />
                <span className="hidden sm:inline">{lang === 'kk' ? 'ФОКУС' : lang === 'ru' ? 'ФОКУС' : 'ZEN'}</span>
              </>
            )}
          </button>
        </div>

        {/* Prominent Mobile-First Floating "Терминал 2.0" Quick-Launch Button */}
        {!isTerminalOpen && !isPricingOpen && (
          <div className="sm:hidden fixed bottom-20 left-1/2 -translate-x-1/2 z-35 pointer-events-auto">
            <button
              onClick={() => {
                soundEngine.playInteraction();
                setIsTerminalOpen(true);
              }}
              className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-300 via-teal-200 to-cyan-400 text-slate-950 font-black text-xs tracking-wider shadow-[0_0_35px_rgba(0,240,255,0.7)] active:scale-95 transition-all border-2 border-white/80 uppercase font-mono-data"
              aria-label={lang === 'kk' ? 'Терминал 2.0 ашу' : lang === 'ru' ? 'Открыть Терминал 2.0' : 'Launch Terminal 2.0'}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
              </span>
              <Terminal className="w-4 h-4 text-slate-950 shrink-0 stroke-[2.5]" />
              <span className="font-extrabold">{lang === 'en' ? 'Terminal 2.0' : 'Терминал 2.0'}</span>
            </button>
          </div>
        )}

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
          particleSpeed={particleSpeed}
          onUpdateParticleSpeed={setParticleSpeed}
          particleMode={particleMode}
          onUpdateParticleMode={setParticleMode}
        />

        {/* Pricing / Tiers Modal */}
        <PricingModal
          isOpen={isPricingOpen}
          onClose={() => setIsPricingOpen(false)}
          lang={lang}
        />
      </div>
    </ErrorBoundary>
  );
}
