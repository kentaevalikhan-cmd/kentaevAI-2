import React from 'react';
import { Volume2, VolumeX, Sparkles, Terminal } from 'lucide-react';
import { soundEngine } from '../utils/audio';

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
  onSelectStage,
  onOpenTerminal,
  onOpenPricing,
  isAudioActive,
  onToggleAudio,
  lang,
  onToggleLang,
}) => {
  const t = {
    ru: {
      arch: 'Архитектура',
      precision: 'Точность',
      mastery: 'Обучение',
      context: 'Память',
      pricing: 'Тарифы',
      launch: 'Открыть ИИ',
    },
    en: {
      arch: 'Architecture',
      precision: 'Precision',
      mastery: 'Mastery',
      context: 'Context',
      pricing: 'Pro Plans',
      launch: 'Launch AI',
    },
    kk: {
      arch: 'Архитектура',
      precision: 'Дәлдік',
      mastery: 'Шеберлік',
      context: 'Жады',
      pricing: 'Тарифтер',
      launch: 'ЖИ ашу',
    },
  }[lang];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-8 px-6 md:px-10 py-5 border-b border-white/[0.08] bg-[#050508]/60 backdrop-blur-md">
      {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
      <button
        onClick={() => onSelectStage(0)}
        className="flex items-center gap-2.5 text-left text-white tracking-wider font-display font-bold text-lg md:text-xl whitespace-nowrap shrink-0 group transition-opacity hover:opacity-90"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff] animate-pulse" />
        <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
          KENTAEV<span className="text-cyan-400 font-mono-data text-xs ml-1 font-normal opacity-80">.AI</span>
        </span>
      </button>

      {/* Zone 2: Concise Single-Line Navigation Links */}
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

      {/* Zone 3: Actions (Sound & Primary CTA) */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Language selector */}
        <div className="flex items-center text-xs font-mono-data bg-white/[0.05] border border-white/10 rounded-lg p-0.5">
          {(['ru', 'en', 'kk'] as const).map((l) => (
            <button
              key={l}
              onClick={() => onToggleLang(l)}
              className={`px-2 py-1 rounded-md uppercase transition-colors ${
                lang === l
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Ambient Soundscape Toggle */}
        <button
          onClick={() => {
            onToggleAudio();
            soundEngine.playInteraction();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono-data rounded-lg border transition-all ${
            isAudioActive
              ? 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
              : 'border-white/10 bg-white/[0.04] text-white/50 hover:text-white/80'
          }`}
          title={isAudioActive ? 'Sound On' : 'Sound Off'}
          aria-label="Toggle soundscape"
        >
          {isAudioActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="hidden sm:inline">AUDIO ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-white/40" />
              <span className="hidden sm:inline">AUDIO OFF</span>
            </>
          )}
        </button>

        {/* Primary Action Button */}
        <button
          onClick={onOpenTerminal}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-300 via-teal-200 to-cyan-400 rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>{t.launch}</span>
        </button>
      </div>
    </header>
  );
};
