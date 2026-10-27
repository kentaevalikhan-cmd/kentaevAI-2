import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight, Sparkles } from 'lucide-react';
import { STAGES } from '../utils/particleShapes';
import { soundEngine } from '../utils/audio';
import { STAGE_TRANSLATIONS, UI_TRANSLATIONS, Language } from '../utils/translations';

interface SlideOverlayProps {
  currentStage: number;
  onNext: () => void;
  onPrev: () => void;
  onSelectStage: (idx: number) => void;
  onStart: () => void;
  isAutoPlay: boolean;
  onToggleAutoPlay: () => void;
  lang: Language;
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

  // Retrieve comprehensive localized copy for current stage & language
  const stageTranslations = STAGE_TRANSLATIONS[stage.id] || STAGE_TRANSLATIONS.hero;
  const localizedData = stageTranslations[lang] || stageTranslations.ru;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between pt-16 sm:pt-24 pb-4 sm:pb-8 px-4 sm:px-8 md:px-16 overflow-hidden">
      {/* Ambient background light matching active stage */}
      <div
        className="absolute top-1/3 left-1/2 md:left-1/4 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[50vw] h-[70vw] md:h-[50vw] max-w-[550px] max-h-[550px] rounded-full blur-[100px] md:blur-[140px] pointer-events-none transition-all duration-1000 opacity-40"
        style={{ background: stage.primaryColor }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex items-center max-w-4xl my-auto">
        {/* Selected target element: Highly legible liquid glass narrative container */}
        <div
          key={stage.id}
          className="pointer-events-auto w-full max-w-2xl sm:max-w-3xl liquid-glass rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-white/20 bg-[#07070e]/85 sm:bg-[#07070e]/80 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] space-y-3 sm:space-y-4 md:space-y-5 animate-fadeIn"
        >
          {/* Metadata Kicker with glowing dot & chapter tracker */}
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs md:text-sm tracking-[0.2em] font-mono-data uppercase">
            <span
              className="inline-block w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] animate-pulse"
              style={{ backgroundColor: stage.primaryColor, color: stage.primaryColor }}
            />
            <span
              className="font-bold tracking-wider transition-colors duration-500 drop-shadow-sm"
              style={{ color: stage.primaryColor }}
            >
              {localizedData.kicker}
            </span>
            <span className="text-white/30">/</span>
            <span className="text-white/70 font-semibold">
              {UI_TRANSLATIONS.chapter[lang]} {stage.number}
            </span>
          </div>

          {/* Dominant Headline - Crisp pure white with heavy drop shadow for maximum readability */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.14] text-balance drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)] font-display">
            {localizedData.title}
          </h1>

          {/* Subtitle / Tagline */}
          <p className="text-sm sm:text-base md:text-lg text-cyan-100/90 font-normal max-w-2xl text-balance drop-shadow-sm">
            {localizedData.tagline}
          </p>

          {/* Descriptive Body - Legible on all mobile and desktop screens */}
          <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-2xl leading-relaxed">
            {localizedData.description}
          </p>

          {/* Quantitative Metrics Bar - Crystal clear glass cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 max-w-xl">
            {localizedData.metrics.map((metric, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 sm:p-3 text-center sm:text-left transition-colors hover:border-white/20"
              >
                <div className="text-sm sm:text-base md:text-lg font-extrabold font-mono-data text-white drop-shadow-sm">
                  {metric.value}
                </div>
                <div className="text-[9px] sm:text-[11px] uppercase tracking-wider text-cyan-300/80 font-mono-data truncate mt-0.5 font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            {isHero ? (
              <div className="relative group inline-block w-full sm:w-auto">
                <div
                  className="absolute -inset-1 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse"
                  style={{ background: stage.primaryColor }}
                />
                <button
                  onClick={() => {
                    soundEngine.playInteraction();
                    onStart();
                  }}
                  className="relative w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full liquid-button text-white font-bold text-xs sm:text-sm tracking-wide group-hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                >
                  <span className="tracking-wider uppercase font-mono-data font-bold">
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
                className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl text-slate-950 font-extrabold text-xs sm:text-sm tracking-wider uppercase font-mono-data bg-gradient-to-r from-cyan-300 via-teal-200 to-cyan-400 shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:shadow-[0_0_45px_rgba(0,240,255,0.9)] active:scale-[0.98] transition-all"
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
                className="min-h-[46px] flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl text-xs font-mono-data tracking-wider uppercase text-white font-bold liquid-button active:scale-95 transition-all shadow-md"
              >
                <span>{localizedData.cta}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {/* Quick jump to interactive terminal */}
            {!isHero && (
              <button
                onClick={() => {
                  soundEngine.playInteraction();
                  onStart();
                }}
                className="min-h-[44px] flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-data text-cyan-300 hover:text-white bg-cyan-950/40 border border-cyan-500/30 tracking-wider uppercase transition-all"
              >
                <span>{UI_TRANSLATIONS.terminalBtn[lang]} →</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Floating Navigation Bar - Mobile Thumb Zone with Liquid Glass */}
      <footer className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl liquid-glass text-xs font-mono-data text-white/70 mb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {/* Left: Current Chapter counter and touch progress */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex items-center gap-1.5 text-white/80">
            <span className="font-semibold text-white text-xs sm:text-sm">
              {String(currentStage + 1).padStart(2, '0')}
            </span>
            <span className="text-white/30">/</span>
            <span className="text-white/40 text-xs sm:text-sm">
              {String(STAGES.length).padStart(2, '0')}
            </span>
          </div>

          {/* Interactive stage progress dots with touch padding */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {STAGES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  soundEngine.playInteraction();
                  onSelectStage(idx);
                }}
                aria-label={`Jump to stage ${s.number}`}
                className="py-2 px-0.5 group transition-all duration-300"
              >
                <div
                  className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                    currentStage === idx
                      ? 'w-5 sm:w-8 bg-cyan-400 shadow-[0_0_8px_#00f0ff]'
                      : 'w-1.5 sm:w-2 bg-white/20 group-hover:bg-white/40'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Center: Particle physics hint on desktop */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-ping" />
          <span>
            {lang === 'kk'
              ? '3D кванттық нейрондық өрісті қозғау үшін меңзерді жылжытыңыз'
              : lang === 'ru'
              ? 'Перемещайте курсор для взаимодействия с 3D квантовым полем'
              : 'Move cursor to perturb 3D quantum neural field'}
          </span>
        </div>

        {/* Right: Controls (Previous, Next, Auto-Play) with 44px min touch targets */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Auto play toggle */}
          <button
            onClick={onToggleAutoPlay}
            className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border text-white/70 transition-colors ${
              isAutoPlay
                ? 'border-cyan-500/50 text-cyan-300 bg-cyan-950/30'
                : 'border-white/10 hover:border-white/25 hover:text-white'
            }`}
            title={isAutoPlay ? 'Pause Auto-Cycle' : 'Enable Auto-Cycle'}
            aria-label="Toggle auto play"
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Prev button */}
          <button
            onClick={() => {
              soundEngine.playInteraction();
              onPrev();
            }}
            disabled={currentStage === 0}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-white/10 hover:border-white/25 text-white/70 hover:text-white disabled:opacity-20 disabled:pointer-events-none active:scale-95 transition-all"
            aria-label="Previous chapter"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next button */}
          <button
            onClick={() => {
              soundEngine.playInteraction();
              onNext();
            }}
            disabled={currentStage === STAGES.length - 1}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-white/10 hover:border-white/25 text-white/70 hover:text-white disabled:opacity-20 disabled:pointer-events-none active:scale-95 transition-all"
            aria-label="Next chapter"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};
