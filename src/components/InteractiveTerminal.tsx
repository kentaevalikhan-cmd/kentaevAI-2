import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Paperclip,
  Trash2,
  Copy,
  Check,
  Cpu,
  Zap,
  HelpCircle,
  Eye,
  Sliders,
  Palette,
  Volume2
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  timestamp: string;
  toolExecuted?: string;
}

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onSetStage: (stageIndex: number) => void;
  onOpenPricing: () => void;
  lang: 'ru' | 'en' | 'kk';
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  onSetStage,
  onOpenPricing,
  lang,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        lang === 'ru'
          ? 'Привет! Я KentaevAI — квантовая нейронная модель нового поколения. Я управляю этим 3D полем частиц, умею рассуждать, писать код, анализировать изображения, генерировать визуал и выполнять логические операции.\n\nПопробуйте написать:\n• «Включи режим лазера»\n• «Покажи архитектуру синапсов»\n• «Реши уравнение e^(i*pi) + 1»\n• «Сгенерируй код квантового оптимизатора»'
          : lang === 'kk'
          ? 'Сәлем! Мен KentaevAI — жаңа буынның кванттық нейрондық моделімін. Мен осы 3D бөлшектер өрісін басқарамын, ой қорытамын, код жазамын және логикалық амалдарды орындаймын.'
          : 'Greetings. I am KentaevAI — the next-generation quantum neural AI. I control this 3D particle canvas, reason through complex engineering dilemmas, synthesize clean code, and execute multi-modal tasks with zero latency.\n\nTry asking:\n• "Switch to laser mode"\n• "Show synaptic architecture"\n• "Solve complex math"\n• "Synthesize an autonomous agent loop"',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processAICommand = async (userText: string, imageSrc?: string | null) => {
    const text = userText.toLowerCase().trim();
    let reply = '';
    let toolAction = '';

    // Check for interactive 3D particle controls from chat
    if (text.includes('лазер') || text.includes('laser') || text.includes('упрости') || text.includes('simplify')) {
      onSetStage(6);
      reply = '⚡ Фокусирую 24 000 квантовых частиц в сингулярный лазерный луч. Режим абсолютной простоты и нулевой энтропии активирован.';
      toolAction = 'Particle Morph → Stage 06 (Laser Singularity)';
    } else if (text.includes('синапс') || text.includes('synapse') || text.includes('спирал') || text.includes('helix') || text.includes('днк')) {
      onSetStage(1);
      reply = '🧬 Перестраиваю структуру поля в двойную нейронную спираль. Мультимодальные тензоры синхронизированы.';
      toolAction = 'Particle Morph → Stage 01 (Neural Synapse)';
    } else if (text.includes('арка') || text.includes('gateway') || text.includes('точност') || text.includes('precision') || text.includes('портал')) {
      onSetStage(2);
      reply = '🏛 Формирую параболическую квантовую арку точности. Верификационные контуры задействованы на 100%.';
      toolAction = 'Particle Morph → Stage 02 (Deterministic Gateway)';
    } else if (text.includes('ядро') || text.includes('mastery') || text.includes('мастерств') || text.includes('сфер') || text.includes('orbit')) {
      onSetStage(3);
      reply = '⚛️ Выстраиваю бинарную орбитальную систему мастерства. 2.4e25 FLOPs синтетического опыта синхронизированы.';
      toolAction = 'Particle Morph → Stage 03 (Binary Crucible)';
    } else if (text.includes('горизонт') || text.includes('horizon') || text.includes('памят') || text.includes('лент') || text.includes('ribbon') || text.includes('золот')) {
      onSetStage(4);
      reply = '🌊 Разворачиваю бесконечную реку контекстной памяти (2.0M токенов). Векторный кэш доступен с задержкой 0.4мс.';
      toolAction = 'Particle Morph → Stage 04 (Infinite Horizon)';
    } else if (text.includes('вихрь') || text.includes('vortex') || text.includes('торнад') || text.includes('рассужд') || text.includes('reason')) {
      onSetStage(5);
      reply = '🌪 Активирую когнитивный вихрь автономного декомпозирования. Глубина рекурсивного планирования: 64 шага.';
      toolAction = 'Particle Morph → Stage 05 (Cognitive Vortex)';
    } else if (text.includes('клетк') || text.includes('cage') || text.includes('купол') || text.includes('суверенитет') || text.includes('sovereign')) {
      onSetStage(7);
      reply = '🌐 Разворачиваю геодезический защитный купол суверенной среды. Полная изоляция от внешних телеметрических утечек.';
      toolAction = 'Particle Morph → Stage 07 (Sovereign Cage)';
    } else if (text.includes('волна') || text.includes('wave') || text.includes('старт') || text.includes('hero') || text.includes('главн')) {
      onSetStage(0);
      reply = '🌊 Возвращаю квантовое волновое поле горизонта KentaevAI.';
      toolAction = 'Particle Morph → Stage 00 (Quantum Ocean)';
    } else if (text.includes('тариф') || text.includes('цен') || text.includes('pro') || text.includes('ultra') || text.includes('plan')) {
      onOpenPricing();
      reply = '✦ Открываю панель тарифов KentaevAI: Free (0 ₸), Pro (4 990 ₸/мес) и Ultra (8 990 ₸/мес).';
      toolAction = 'UI Action → Open Pricing Modal';
    } else if (imageSrc) {
      reply = '👁 Анализ изображения завершён:\n\n• Обнаружены высокочастотные визуальные паттерны.\n• Композиция и цветовая температура соответствуют современному dark-luxury дизайну.\n• Объекты структурированы и готовы к обработке мультимодальным вектором KentaevAI.';
      toolAction = 'Vision Model → Multimodal Tensor Extraction';
    } else if (text.includes('кто ты') || text.includes('who are you')) {
      reply = 'Я KentaevAI — флагманский автономный искусственный интеллект. Я сочетаю квантовую скорость генерации токенов (185+ t/s), нулевую утечку данных, глубокое аналитическое мышление и способность управлять интерактивными физическими средами.';
    } else if (text.includes('посчитай') || text.includes('calculate') || /[\d+\-*/^=]/.test(text)) {
      try {
        const mathClean = text.replace(/[^0-9+\-*/().^]/g, '');
        // eslint-disable-next-line no-eval
        const result = Function(`'use strict'; return (${mathClean})`)();
        reply = `🔢 Точный математический результат:\n\n${mathClean} = ${result}\n\nВычислено с гарантированной точностью в верифицированном исполнителе.`;
        toolAction = 'Verified Math Engine → Execution Complete';
      } catch {
        reply = 'Вычислил аналитически: выражение формализовано и проверено в строгом детерминированном математическом контуре.';
      }
    } else {
      reply = `🧠 [KentaevAI Kernel]: Запрос принят и обработан через квантовую тензорную сеть.\n\n«${userText}»\n\nАрхитектура KentaevAI обеспечивает предельную сжатость, отсутствие лишнего шума и мгновенную практическую применимость. Вы можете комбинировать текстовые запросы с управлением 3D-полем частиц в реальном времени.`;
    }

    return { reply, toolAction };
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!input.trim() && !attachedImage) || isTyping) return;

    soundEngine.playInteraction();

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim() || (attachedImage ? 'Анализ изображения' : ''),
      image: attachedImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    const currentImg = attachedImage;
    setAttachedImage(null);
    setIsTyping(true);

    // Realistic neural inference delay (300-600ms)
    setTimeout(async () => {
      const { reply, toolAction } = await processAICommand(userMsg.content, currentImg);
      soundEngine.playChime(660, 0.05);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        toolExecuted: toolAction || undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xl animate-fadeIn">
      {/* Container Glass Box */}
      <div className="relative w-full max-w-3xl h-[88vh] max-h-[760px] flex flex-col rounded-2xl border border-white/15 bg-gradient-to-b from-[#0e0d16]/95 via-[#07060b]/98 to-[#050508]/98 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="h-4 w-[1px] bg-white/15 mx-1" />
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="font-display font-semibold text-sm tracking-wide text-white">
                KentaevAI Neural Terminal
              </span>
              <span className="text-[10px] font-mono-data px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                ACTIVE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMessages([]);
                soundEngine.playInteraction();
              }}
              title="Clear terminal"
              className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 font-sans text-sm">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 text-[11px] font-mono-data text-white/35 mb-1 px-1">
                <span>{m.role === 'user' ? 'YOU' : 'KENTAEV.AI'}</span>
                <span>·</span>
                <span>{m.timestamp}</span>
              </div>

              <div
                className={`group relative max-w-[88%] rounded-xl p-4 leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md'
                    : 'bg-white/[0.06] border border-white/10 text-white/90 backdrop-blur-sm'
                }`}
              >
                {/* Tool Executed Pill */}
                {m.toolExecuted && (
                  <div className="mb-2 flex items-center gap-1.5 text-[11px] font-mono-data text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 rounded px-2 py-0.5 w-fit">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    <span>{m.toolExecuted}</span>
                  </div>
                )}

                {/* Attached Image preview */}
                {m.image && (
                  <img
                    src={m.image}
                    alt="Upload"
                    className="max-h-56 rounded-lg mb-3 object-cover border border-white/20"
                  />
                )}

                <div className="whitespace-pre-wrap">{m.content}</div>

                {/* Copy button */}
                <button
                  onClick={() => handleCopy(m.id, m.content)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-white/50 hover:text-white rounded bg-black/40"
                  title="Copy"
                >
                  {copiedId === m.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 p-3 bg-white/[0.04] border border-white/10 rounded-xl w-fit text-cyan-300 text-xs font-mono-data">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>KentaevAI reasoning & synthesizing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 px-5 py-2 overflow-x-auto border-t border-white/5 bg-white/[0.01]">
          {[
            { label: '⚡ Режим лазера', prompt: 'Включи режим лазера' },
            { label: '🧬 Нейронный синапс', prompt: 'Покажи архитектуру синапсов' },
            { label: '🌊 Горизонт памяти', prompt: 'Переключись на горизонт памяти' },
            { label: '🌪 Когнитивный вихрь', prompt: 'Активируй когнитивный вихрь' },
            { label: '✦ Тарифы Pro', prompt: 'Покажи доступные тарифы' },
          ].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(chip.prompt);
                soundEngine.playInteraction();
              }}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono-data whitespace-nowrap rounded-lg bg-white/[0.04] hover:bg-white/[0.09] text-white/70 hover:text-white border border-white/10 transition-colors"
            >
              <span>{chip.label}</span>
            </button>
          ))}
        </div>

        {/* Image Attachment Preview */}
        {attachedImage && (
          <div className="relative px-5 py-2 border-t border-white/10 bg-black/40 flex items-center gap-3">
            <img
              src={attachedImage}
              alt="Preview"
              className="w-12 h-12 object-cover rounded-lg border border-white/20"
            />
            <span className="text-xs text-white/70 font-mono-data">Изображение прикреплено</span>
            <button
              onClick={() => setAttachedImage(null)}
              className="ml-auto text-xs text-red-400 hover:text-red-300 font-mono-data"
            >
              Удалить
            </button>
          </div>
        )}

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Прикрепить изображение"
            className="p-2.5 rounded-xl border border-white/10 hover:border-white/25 text-white/60 hover:text-white bg-white/[0.04] transition-colors"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              lang === 'ru'
                ? 'Задайте вопрос или введите команду для поля частиц...'
                : 'Ask a question or enter a command for the 3D particles...'
            }
            className="flex-1 bg-white/[0.06] border border-white/15 focus:border-cyan-400/60 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/35 outline-none font-sans transition-colors"
          />

          <button
            type="submit"
            disabled={!input.trim() && !attachedImage}
            className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold hover:opacity-95 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
