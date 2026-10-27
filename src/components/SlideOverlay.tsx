import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight, Sparkles } from 'lucide-react';
import { STAGES, StageData } from '../utils/particleShapes';
import { soundEngine } from '../utils/audio';

interface SlideOverlayProps {
  currentStage: number;
  onNext: () => void;
  onPrev: () => void;
  onSelectStage: (idx: number) => void;
  onStart: () => void;
  isAutoPlay: boolean;
  onToggleAutoPlay: () => void;
  lang: 'ru' | 'en' | 'kk';
}

export const SlideOverlay: React.FC<SlideOverlayProps> = ({
  currentStage,
  onNext,
  onPrev,
  onSelectStage,
  onStart,
  isAutoPlay,
  onToggleAutoPlay,
  lang,
}) => {
  const stage = STAGES[currentStage] || STAGES[0];
  const isHero = currentStage === 0;
  const isFinale = currentStage === STAGES.length - 1;

  // Localized copy translations
  const localizedMap = {
    ru: {
      title: stage.title,
      tagline: stage.tagline,
      description: stage.description,
      cta: isHero ? 'Исследовать архитектуру' : isFinale ? 'Запустить KentaevAI' : 'Следующий принцип',
    },
    en: {
      title: stage.title,
      tagline: stage.tagline,
      description: stage.description,
      cta: isHero ? 'Explore Architecture' : isFinale ? 'Deploy KentaevAI' : 'Next Principle',
    },
    kk: {
      title: stage.title,
      tagline: stage.tagline,
      description: stage.description,
      cta: isHero ? 'Архитектураны зерттеу' : isFinale ? 'KentaevAI іске қосу' : 'Келесі қағидат',
    },
  };
  const localizedData = localizedMap[lang] || localizedMap.ru;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between pt-24 pb-8 px-6 md:px-16 overflow-hidden">
      {/* Ambient background light matching active stage */}
      <div
        className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] max-w-[600px] max-h-[600px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 opacity-40"
        style={{ background: stage.primaryColor }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex items-center max-w-4xl">
        <div key={stage.id} className="pointer-events-auto space-y-6 animate-fadeIn">
          {/* Unboxed Metadata Kicker (Anti-Slop: Zero Pills) */}
          <div className="flex items-center gap-3 text-xs md:text-sm tracking-[0.25em] font-mono-data uppercase text-white/60">
            <span
              className="font-semibold transition-colors duration-500"
              style={{ color: stage.primaryColor }}
            >
              {stage.valueKeyword}
            </span>
            <span className="opacity-40">/</span>
            <span className="text-white/40">CHAPTER {stage.number}</span>
          </div>

          {/* Dominant Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance drop-shadow-md font-display"
          >
            {localizedData.title}
          </h1>

          {/* Subtitle / Tagline */}
          <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl text-balance">
            {localizedData.tagline}
          </p>

          {/* Descriptive Body */}
          <p className="text-sm md:text-base text-white/55 max-w-xl leading-relaxed">
            {localizedData.description}
          </p>

          {/* Quantitative Metrics Bar (Adjacency to claims) */}
          <div className="grid grid-cols-3 gap-4 pt-4 pb-2 max-w-lg border-t border-white/10">
            {stage.metrics.map((metric, i) => (
              <div key={i} className="space-y-0.5">
                <div className="text-base sm:text-lg font-bold font-mono-data text-white">
                  {metric.value}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-white/40 font-mono-data">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Hero / Stage Action Button */}
          <div className="pt-2 flex items-center gap-4">
            {isHero ? (
              <div className="relative group inline-block">
                {/* Circular pulse halo matching video */}
                <div
                  className="absolute -inset-1.5 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse"
                  style={{ background: stage.primaryColor }}
                />
                <button
                  onClick={() => {
                    soundEngine.playInteraction();
                    onStart();
                  }}
                  className="relative flex items-center gap-3 px-8 py-4 rounded-full bg-slate-950/90 text-white font-semibold text-sm tracking-wide border border-white/30 backdrop-blur-xl group-hover:scale-[1.03] active:scale-[0.98] transition-all"
                >
                  <span className="tracking-wider uppercase text-xs font-mono-data">
                    {localizedData.cta}
                  </span>
                  <ArrowRight className="w-4 h-4 text-cyan-300 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : isFinale ? (
              <button
                onClick={() => {
                  soundEngine.playInteraction();
                  onStart();
                }}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-slate-950 font-bold text-sm tracking-wide bg-gradient-to-r from-cyan-300 via-teal-200 to-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{localizedData.cta}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  soundEngine.playInteraction();
                  onNext();
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-mono-data tracking-wider uppercase text-white/90 bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all"
              >
                <span>{localizedData.cta}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Quick jump to interactive terminal */}
            {!isHero && (
              <button
                onClick={() => {
                  soundEngine.playInteraction();
                  onStart();
                }}
                className="text-xs font-mono-data text-white/40 hover:text-cyan-300 tracking-wider uppercase transition-colors"
              >
                Launch Console →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Floating Navigation Bar */}
      <footer className="pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.08] text-xs font-mono-data text-white/60">
        {/* Left: Current Chapter and Interactive Dots */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-white/80">
            <span className="font-semibold text-white">
              {String(currentStage + 1).padStart(2, '0')}
            </span>
            <span className="text-white/30">/</span>
            <span className="text-white/40">
              {String(STAGES.length).padStart(2, '0')}
            </span>
          </div>

          {/* Interactive stage progress dots */}
          <div className="flex items-center gap-1.5">
            {STAGES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  soundEngine.playInteraction();
                  onSelectStage(idx);
                }}
                aria-label={`Jump to stage ${s.number}: ${s.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStage === idx
                    ? 'w-8 bg-cyan-400 shadow-[0_0_8px_#00f0ff]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <span className="hidden md:inline text-white/40 text-[11px] truncate max-w-[200px]">
            {stage.title}
          </span>
        </div>

        {/* Center: Particle physics hint */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-white/40">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-ping" />
          <span>Move cursor to perturb 3D quantum neural field</span>
        </div>

        {/* Right: Controls (Previous, Next, Auto-Play) */}
        <div className="flex items-center gap-2">
          {/* Auto play toggle */}
          <button
            onClick={onToggleAutoPlay}
            className={`p-2 rounded-lg border text-white/60 transition-colors ${
              isAutoPlay
                ? 'border-cyan-500/50 text-cyan-300 bg-cyan-950/20'
                : 'border-white/10 hover:border-white/25 hover:text-white'
            }`}
            title={isAutoPlay ? 'Pause Auto-Cycle' : 'Enable Auto-Cycle'}
            aria-label="Toggle auto play"
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Prev button */}
          <button
            onClick={() => {
              soundEngine.playInteraction();
              onPrev();
            }}
            disabled={currentStage === 0}
            className="p-2 rounded-lg border border-white/10 hover:border-white/25 text-white/70 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            aria-label="Previous chapter"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next button */}
          <button
            onClick={() => {
              soundEngine.playInteraction();
              onNext();
            }}
            disabled={currentStage === STAGES.length - 1}
            className="p-2 rounded-lg border border-white/10 hover:border-white/25 text-white/70 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            aria-label="Next chapter"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};
