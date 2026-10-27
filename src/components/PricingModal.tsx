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

  const content = {
    ru: {
      badge: 'ТАРИФНЫЕ ПЛАНЫ KENTAEV.AI 2.0',
      title: 'Тарифные планы KentaevAI 2.0',
      subtitle: 'От персонального исследования до промышленного внедрения суверенного искусственного интеллекта.',
      month: '/мес',
      toast: (name: string) => `Тариф ${name} выбран! Доступ будет открыт в ближайшем релизе 🚀`,
      plans: [
        {
          name: 'Free',
          price: '0 ₸',
          period: '',
          badge: 'Текущий',
          features: [
            'Интерактивный доступ к KentaevAI 2.0',
            '24 000 квантовых частиц в 60 FPS',
            'Мультимодальное зрение и анализ',
            'Векторная память до 128k токенов',
            'Локальные заметки, таймеры и бенчмарк',
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
          badge: 'Популярный',
          features: [
            'Все возможности Free',
            'Приоритетное квантовое ядро (185+ t/s)',
            'Генерация и синтез кода в реальном времени',
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
          badge: 'Максимум',
          features: [
            'Все возможности Pro',
            'Полный контекстный горизонт 2.0M токенов',
            'Неограниченная генерация и синтез архитектур',
            'Локальный Docker контейнер для On-Prem',
            'Нулевая задержка (Sub-20ms cold start)',
            'Персональный API ключ и ранний доступ',
          ],
          cta: 'Выбрать Ultra',
          isCurrent: false,
          border: 'border-purple-500/50',
          glow: 'shadow-[0_0_40px_rgba(168,85,247,0.15)]',
        },
      ],
    },
    en: {
      badge: 'KENTAEV.AI 2.0 TIERS',
      title: 'KentaevAI 2.0 Pricing Plans',
      subtitle: 'From personal research to enterprise-grade sovereign intelligence deployment.',
      month: '/mo',
      toast: (name: string) => `Plan ${name} selected! Access will unlock in upcoming release 🚀`,
      plans: [
        {
          name: 'Free',
          price: '0 ₸',
          period: '',
          badge: 'Current',
          features: [
            'Interactive access to KentaevAI 2.0',
            '24,000 quantum particles in 60 FPS',
            'Multimodal vision and diagnostics',
            'Vector memory up to 128k tokens',
            'Local notes, timers and hardware benchmark',
          ],
          cta: 'Your Current Plan',
          isCurrent: true,
          border: 'border-white/10',
          glow: '',
        },
        {
          name: 'Pro',
          price: '4,990 ₸',
          period: '/mo',
          badge: 'Popular',
          features: [
            'All Free features included',
            'Priority quantum core (185+ t/s)',
            'Real-time code generation and sandbox',
            'Context horizon 1,000,000 tokens',
            'Autonomous agent planning (64 steps)',
            'Custom 3D particle physics controls',
          ],
          cta: 'Upgrade to Pro',
          isCurrent: false,
          border: 'border-cyan-500/50',
          glow: 'shadow-[0_0_40px_rgba(0,240,255,0.15)]',
        },
        {
          name: 'Ultra Sovereign',
          price: '8,990 ₸',
          period: '/mo',
          badge: 'Maximum',
          features: [
            'All Pro features included',
            'Full 2.0M token context horizon',
            'Unlimited architectural code synthesis',
            'Self-hosted Docker container for On-Prem',
            'Zero latency (Sub-20ms cold start)',
            'Dedicated sovereign API keys & early access',
          ],
          cta: 'Upgrade to Ultra',
          isCurrent: false,
          border: 'border-purple-500/50',
          glow: 'shadow-[0_0_40px_rgba(168,85,247,0.15)]',
        },
      ],
    },
    kk: {
      badge: 'KENTAEV.AI 2.0 ТАРИФТЕРІ',
      title: 'KentaevAI 2.0 Тарифтік Жоспарлары',
      subtitle: 'Жеке зерттеулерден бастап сувереннді жасанды интеллектті өндірістік енгізуге дейін.',
      month: '/ай',
      toast: (name: string) => `${name} тарифі таңдалды! Қолжетімділік жақын арада ашылады 🚀`,
      plans: [
        {
          name: 'Тегін (Free)',
          price: '0 ₸',
          period: '',
          badge: 'Ағымдағы',
          features: [
            'KentaevAI 2.0 жүйесіне интерактивті қолжетімділік',
            '60 FPS жылдамдықтағы 24 000 кванттық бөлшектер',
            'Мультимодальды көру және талдау',
            '128k токенге дейінгі векторлық жады',
            'Жергілікті жазбалар, таймерлер және сынақтар',
          ],
          cta: 'Сіздің ағымдағы тарифіңіз',
          isCurrent: true,
          border: 'border-white/10',
          glow: '',
        },
        {
          name: 'Pro',
          price: '4 990 ₸',
          period: '/ай',
          badge: 'Танымал',
          features: [
            'Тегін нұсқаның барлық мүмкіндіктері',
            'Басымды кванттық ядро (185+ т/с)',
            'Нақты уақыттағы код генерациясы мен тестілеу',
            '1 000 000 токендік контекст көкжиегі',
            'Автономиялық агенттік жоспарлау (64 қадам)',
            '3D бөлшектер физикасын теңшеу',
          ],
          cta: 'Pro таңдау',
          isCurrent: false,
          border: 'border-cyan-500/50',
          glow: 'shadow-[0_0_40px_rgba(0,240,255,0.15)]',
        },
        {
          name: 'Ultra Sovereign',
          price: '8 990 ₸',
          period: '/ай',
          badge: 'Ең жоғарғы',
          features: [
            'Pro нұсқасының барлық артықшылықтары',
            'Толық 2.0M токендік контекст көлемі',
            'Шексіз архитектуралық код синтезі',
            'Жеке серверге арналған Docker контейнері',
            'Нөлдік кідіріс (20мс-тен төмен басталу)',
            'Жеке API кілті және ерте қолжетімділік',
          ],
          cta: 'Ultra таңдау',
          isCurrent: false,
          border: 'border-purple-500/50',
          glow: 'shadow-[0_0_40px_rgba(168,85,247,0.15)]',
        },
      ],
    },
  }[lang];

  const handleSelectPlan = (planName: string) => {
    soundEngine.playInteraction();
    setToastMessage(content.toast(planName));
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl liquid-glass p-5 sm:p-6 md:p-10 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl">
        {/* Mobile Drag Handle */}
        <div className="w-10 h-1.5 bg-white/30 rounded-full mx-auto mb-4 sm:hidden shrink-0" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-white/10 hover:border-white/30 text-white/60 hover:text-white bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Subtitle */}
        <div className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono-data tracking-[0.2em] text-cyan-400 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{content.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-display text-white tracking-tight">
            {content.title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/70 max-w-xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Grid of Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {content.plans.map((p, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl border ${p.border} ${p.glow} bg-white/[0.03] backdrop-blur-md transition-transform hover:-translate-y-1`}
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white">{p.name}</h3>
                  <span className="text-[10px] sm:text-[11px] font-mono-data tracking-wider uppercase text-white/60 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {p.badge}
                  </span>
                </div>

                <div className="mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono-data text-white">
                    {p.price}
                  </span>
                  <span className="text-xs text-white/50 ml-1 font-mono-data">{p.period}</span>
                </div>

                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 text-xs leading-relaxed text-white/80">
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
                className={`w-full min-h-[46px] py-3 px-4 rounded-xl text-xs font-mono-data tracking-wider uppercase font-semibold transition-all ${
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
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-5 py-3 rounded-full bg-cyan-950/95 border border-cyan-400/50 text-cyan-200 text-xs sm:text-sm font-mono-data shadow-2xl animate-bounce text-center max-w-[90vw]">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
};
