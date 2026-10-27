import React, { useState } from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ru' | 'en' | 'kk';
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, lang }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectPlan = (planName: string) => {
    soundEngine.playInteraction();
    setToastMessage(`Тариф ${planName} выбран! Доступ будет открыт в ближайшем релизе 🚀`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const plans = [
    {
      name: 'Free',
      price: '0 ₸',
      period: '',
      badge: 'Current',
      features: [
        'Интерактивный доступ к KentaevAI',
        '24 000 частиц в реальном времени',
        'Базовое мультимодальное зрение',
        'Векторная память до 128k токенов',
        'Локальные заметки и таймеры',
      ],
      cta: 'Ваш текущий тариф',
      isCurrent: true,
      border: 'border-white/10',
      glow: '',
    },
    {
      name: 'Pro',
      price: '4 990 ₸',
      period: '/мес',
      badge: 'Popular',
      features: [
        'Все возможности Free',
        'Приоритетное квантовое ядро (185+ t/s)',
        'Генерация изображений высокого разрешения',
        'Контекстный горизонт 1,000,000 токенов',
        'Автономное агентное планирование (64 шага)',
        'Кастомные 3D сцены частиц',
      ],
      cta: 'Выбрать Pro',
      isCurrent: false,
      border: 'border-cyan-500/50',
      glow: 'shadow-[0_0_40px_rgba(0,240,255,0.15)]',
    },
    {
      name: 'Ultra Sovereign',
      price: '8 990 ₸',
      period: '/мес',
      badge: 'Maximum',
      features: [
        'Все возможности Pro',
        'Полный контекстный горизонт 2.0M токенов',
        'Неограниченная генерация и синтез кода',
        'Локальный Docker контейнер для On-Prem',
        'Нулевая задержка (Sub-20ms cold start)',
        'Персональный API ключ и ранний доступ',
      ],
      cta: 'Выбрать Ultra',
      isCurrent: false,
      border: 'border-purple-500/50',
      glow: 'shadow-[0_0_40px_rgba(168,85,247,0.15)]',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-gradient-to-b from-[#13111e]/95 via-[#08070d]/98 to-[#050508]/98 p-6 md:p-10 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-white/30 text-white/60 hover:text-white bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Subtitle */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono-data tracking-[0.2em] text-cyan-400 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KENTAEV.AI TIERS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white tracking-tight">
            Тарифные планы KentaevAI
          </h2>
          <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto">
            От персонального исследования до промышленного внедрения суверенного искусственного интеллекта.
          </p>
        </div>

        {/* Grid of Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col justify-between p-6 rounded-2xl border ${p.border} ${p.glow} bg-white/[0.03] backdrop-blur-md transition-transform hover:-translate-y-1.5`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-xl text-white">{p.name}</h3>
                  <span className="text-[11px] font-mono-data tracking-wider uppercase text-white/50 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {p.badge}
                  </span>
                </div>

                <div className="mb-6">
                  <span className="text-3xl md:text-4xl font-extrabold font-mono-data text-white">
                    {p.price}
                  </span>
                  <span className="text-xs text-white/50 ml-1 font-mono-data">{p.period}</span>
                </div>

                <ul className="space-y-3 mb-8 text-xs leading-relaxed text-white/75">
                  {p.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSelectPlan(p.name)}
                disabled={p.isCurrent}
                className={`w-full py-3 px-4 rounded-xl text-xs font-mono-data tracking-wider uppercase font-semibold transition-all ${
                  p.isCurrent
                    ? 'bg-white/10 text-white/40 cursor-default'
                    : 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-[0.98]'
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-cyan-950/90 border border-cyan-400/50 text-cyan-200 text-sm font-mono-data shadow-2xl animate-bounce">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
};
