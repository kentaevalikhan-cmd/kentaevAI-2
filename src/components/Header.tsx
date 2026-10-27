import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Terminal, Menu, X, ChevronRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { STAGES } from '../utils/particleShapes';
import { STAGE_TRANSLATIONS } from '../utils/translations';

interface HeaderProps {
  currentStage: number;
  onSelectStage: (stageIndex: number) => void;
  onOpenTerminal: () => void;
  onOpenPricing: () => void;
  isAudioActive: boolean;
  onToggleAudio: () => void;
  lang: 'ru' | 'en' | 'kk';
  onToggleLang: (newLang: 'ru' | 'en' | 'kk') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStage,
  onSelectStage,
  onOpenTerminal,
  onOpenPricing,
  isAudioActive,
  onToggleAudio,
  lang,
  onToggleLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    ru: {
      arch: 'Архитектура',
      precision: 'Точность',
      mastery: 'Обучение',
      context: 'Память',
      pricing: 'Тарифы',
      launch: 'Терминал 2.0',
      chapters: 'Главы KentaevAI 2.0',
    },
    en: {
      arch: 'Architecture',
      precision: 'Precision',
      mastery: 'Mastery',
      context: 'Context',
      pricing: 'Pro Plans',
      launch: 'Terminal 2.0',
      chapters: 'KentaevAI 2.0 Chapters',
    },
    kk: {
      arch: 'Архитектура',
      precision: 'Дәлдік',
      mastery: 'Шеберлік',
      context: 'Жады',
      pricing: 'Тарифтер',
      launch: 'Терминал 2.0',
      chapters: 'KentaevAI 2.0 бөлімдері',
    },
  }[lang];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-3 px-4 sm:px-6 md:px-10 py-3 md:py-4.5 liquid-glass pt-[max(0.75rem,env(safe-area-inset-top))]">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            soundEngine.playInteraction();
            onSelectStage(0);
          }}
          className="flex items-center gap-2.5 text-left text-white tracking-wider font-display font-bold text-base sm:text-lg md:text-xl whitespace-nowrap shrink-0 group transition-opacity hover:opacity-90 min-h-[44px]"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_14px_#00f0ff] animate-pulse" />
          <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
            KENTAEV<span className="text-cyan-400 font-mono-data text-[10px] sm:text-xs ml-1 font-semibold opacity-95">.AI 2.0</span>
          </span>
        </button>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-white/60">
          <button
            onClick={() => onSelectStage(1)}
            className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 hover:underline decoration-cyan-400/50 underline-offset-8"
          >
            {t.arch}
          </button>
          <button
            onClick={() => onSelectStage(2)}
            className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0 hover:underline decoration-emerald-400/50 underline-offset-8"
          >
            {t.precision}
          </button>
          <button
            onClick={() => onSelectStage(3)}
            className="hover:text-pink-300 transition-colors whitespace-nowrap shrink-0 hover:underline decoration-pink-400/50 underline-offset-8"
          >
            {t.mastery}
          </button>
          <button
            onClick={() => onSelectStage(4)}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 hover:underline decoration-amber-400/50 underline-offset-8"
          >
            {t.context}
          </button>
          <button
            onClick={onOpenPricing}
            className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.pricing}</span>
          </button>
        </nav>

        {/* Zone 3: Actions (Sound, Lang, Terminal) with 44px Touch Targets */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language selector */}
          <div className="flex items-center text-[10px] sm:text-xs font-mono-data bg-white/[0.05] border border-white/10 rounded-lg p-0.5">
            {(['ru', 'en', 'kk'] as const).map((l) => (
              <button
                key={l}
                onClick={() => onToggleLang(l)}
                className={`px-1.5 sm:px-2 py-1 rounded-md uppercase min-w-[24px] min-h-[30px] flex items-center justify-center transition-colors ${
                  lang === l
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleAudio();
              soundEngine.playInteraction();
            }}
            className={`min-w-[44px] min-h-[44px] flex items-center justify-center px-2.5 sm:px-3 rounded-lg border transition-all ${
              isAudioActive
                ? 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'border-white/10 bg-white/[0.04] text-white/50 hover:text-white/80'
            }`}
            title={isAudioActive ? 'Sound On' : 'Sound Off'}
            aria-label="Toggle soundscape"
          >
            {isAudioActive ? (
              <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-white/40" />
            )}
          </button>

          {/* Primary Action Button (Terminal 2.0) - Always visible on phones */}
          <button
            onClick={() => {
              soundEngine.playInteraction();
              onOpenTerminal();
            }}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4.5 min-h-[44px] text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] active:scale-95 transition-all whitespace-nowrap shrink-0"
            title="Открыть Терминал KentaevAI 2.0"
          >
            <Terminal className="w-4 h-4 shrink-0" />
            <span className="font-bold text-xs tracking-wide">{t.launch}</span>
          </button>

          {/* Mobile Menu Trigger for all chapters */}
          <button
            onClick={() => {
              soundEngine.playInteraction();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg border border-white/10 text-white/70 hover:text-white bg-white/[0.04] transition-colors"
            aria-label="Toggle mobile chapters menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer / Chapters Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/80 backdrop-blur-xl animate-fadeIn">
          <div className="w-full max-h-[80vh] overflow-y-auto rounded-t-3xl border-t border-white/15 bg-gradient-to-b from-[#11101b] to-[#050508] p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-display font-semibold text-sm text-white tracking-wide">
                {t.chapters}
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              {STAGES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    soundEngine.playInteraction();
                    onSelectStage(idx);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full min-h-[46px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors ${
                    currentStage === idx
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono-data text-xs text-white/40">
                      {s.number}
                    </span>
                    <span className="text-sm font-medium">
                      {STAGE_TRANSLATIONS[s.id]?.[lang]?.title || s.title}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30 shrink-0" />
                </button>
              ))}
            </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    onOpenPricing();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 min-h-[44px] flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 text-xs font-mono-data text-white font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.pricing}</span>
                </button>

                <button
                  onClick={() => {
                    onOpenTerminal();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-cyan-400 text-slate-950 text-xs font-mono-data font-bold"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{t.launch}</span>
                </button>
              </div>
            </div>
          </div>
      )}
    </>
  );
};
