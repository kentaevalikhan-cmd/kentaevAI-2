export type Language = 'ru' | 'en' | 'kk';

export interface LocalizedStage {
  title: string;
  tagline: string;
  description: string;
  kicker: string;
  cta: string;
  metrics: { label: string; value: string }[];
}

export const STAGE_TRANSLATIONS: Record<string, Record<Language, LocalizedStage>> = {
  hero: {
    kk: {
      title: 'Біз болашақтың санасын күшейтеміз',
      tagline: 'KentaevAI 2.0 кванттық нейрондық архитектурасын ашыңыз',
      description: 'Нақты уақыттағы мультимодальды пайымдау, лездік синтез және нөлдік кідіріспен орындау үшін жасалған дербес, егеменді интеллект өзегі.',
      kicker: 'КВАНТТЫҚ КӨКЖИЕК',
      cta: 'Архитектураны зерттеу 2.0',
      metrics: [
        { label: 'Токен жылдамдығы', value: '185 т/с' },
        { label: 'Суық кідіріс', value: '42мс' },
        { label: 'Контекст көкжиегі', value: '2.0M' }
      ]
    },
    ru: {
      title: 'Мы создаем интеллект будущего',
      tagline: 'Откройте квантовую нейронную архитектуру KentaevAI 2.0',
      description: 'Автономный, суверенный движок искусственного интеллекта для мультимодальных рассуждений в реальном времени, мгновенного синтеза и работы с нулевой задержкой.',
      kicker: 'КВАНТОВЫЙ ГОРИЗОНТ',
      cta: 'Исследовать архитектуру 2.0',
      metrics: [
        { label: 'Скорость токенов', value: '185 т/с' },
        { label: 'Холодная задержка', value: '42мс' },
        { label: 'Горизонт контекста', value: '2.0M' }
      ]
    },
    en: {
      title: 'We power the minds of the future',
      tagline: 'Discover the quantum neural architecture behind KentaevAI 2.0',
      description: 'An autonomous, sovereign intelligence engine engineered for real-time multimodal reasoning, instant synthesis, and zero-latency execution.',
      kicker: 'THE QUANTUM HORIZON',
      cta: 'Explore Architecture 2.0',
      metrics: [
        { label: 'Token Speed', value: '185 t/s' },
        { label: 'Cold Latency', value: '42ms' },
        { label: 'Context Horizon', value: '2.0M' }
      ]
    }
  },
  synapse: {
    kk: {
      title: 'Біртұтас нейрондық синапс',
      tagline: 'Бөлшектенген адаптерлерсіз терең кросс-модальды таным',
      description: 'Мәтін, көру, код және кеңістіктік телеметрия біртұтас тензорлық негізде жұмыс істейді, мәнмәтіннің бұрмалануын және аударма шығындарын жояды.',
      kicker: 'ҚҰНДЫЛЫҚ · ТҰТАСТЫҚ',
      cta: 'Келесі қағидат',
      metrics: [
        { label: 'Модальділіктер', value: 'Көру · Аудио · Код' },
        { label: 'Тензор үйлесімі', value: '99.98%' },
        { label: 'Энтропия ауысуы', value: '-38%' }
      ]
    },
    ru: {
      title: 'Единый нейронный синапс',
      tagline: 'Глубокое кросс-модальное познание без фрагментированных адаптеров',
      description: 'Текст, зрение, код и пространственная телеметрия выполняются на единой тензорной архитектуре, устраняя потерю контекста.',
      kicker: 'ЦЕННОСТЬ · СВЯЗНОСТЬ',
      cta: 'Следующий принцип',
      metrics: [
        { label: 'Модальности', value: 'Зрение · Аудио · Код' },
        { label: 'Выравнивание тензоров', value: '99.98%' },
        { label: 'Сдвиг энтропии', value: '-38%' }
      ]
    },
    en: {
      title: 'The Unified Neural Synapse',
      tagline: 'Deep cross-modal cognition without fragmented adapters',
      description: 'Text, vision, code, and spatial telemetry run on a singular coherent tensor backbone, eliminating context dilution and translation loss.',
      kicker: 'WE VALUE · COHERENCE',
      cta: 'Next Principle',
      metrics: [
        { label: 'Modalities', value: 'Vision · Audio · Code' },
        { label: 'Tensor Alignment', value: '99.98%' },
        { label: 'Entropy Shift', value: '-38%' }
      ]
    }
  },
  precision: {
    kk: {
      title: 'Детерминирленген дәлдікке ұмтылыс',
      tagline: 'Статистикалық болжамнан тыс: тексерілген математикалық қатаңдық',
      description: 'Кірістірілген тексеру сатылары, формальды логикалық дәлелдеу және өздігінен аудит жүргізу маңызды тапсырмаларда фактілік мінсіздікті қамтамасыз етеді.',
      kicker: 'ҚҰНДЫЛЫҚ · ДӘЛДІК',
      cta: 'Келесі қағидат',
      metrics: [
        { label: 'Галлюцинация деңгейі', value: '< 0.04%' },
        { label: 'Дәлелдеу дәлдігі', value: '99.4%' },
        { label: 'Параллель тексерулер', value: '4x Қатар' }
      ]
    },
    ru: {
      title: 'Стремление к детерминированной точности',
      tagline: 'За пределами статистических догадок: доказанная математическая строгость',
      description: 'Встроенные фазы верификации, формальная логика и самоаудит гарантируют фактическую точность в критически важных задачах.',
      kicker: 'ЦЕННОСТЬ · ТОЧНОСТЬ',
      cta: 'Следующий принцип',
      metrics: [
        { label: 'Галлюцинации', value: '< 0.04%' },
        { label: 'Точность доказательств', value: '99.4%' },
        { label: 'Проверки', value: '4x Параллель' }
      ]
    },
    en: {
      title: 'The Hunger for Deterministic Precision',
      tagline: 'Beyond statistical guessing: verified mathematical rigor',
      description: 'Integrated verification passes, formal logic proofing, and self-auditing inference pipelines guarantee factual precision across mission-critical workflows.',
      kicker: 'WE VALUE · PRECISION',
      cta: 'Next Principle',
      metrics: [
        { label: 'Hallucination Rate', value: '< 0.04%' },
        { label: 'Proof Accuracy', value: '99.4%' },
        { label: 'Verification Passes', value: '4x Parallel' }
      ]
    }
  },
  mastery: {
    kk: {
      title: 'Шынайы шеберлікке жеткізген жаттығулар',
      tagline: 'Жоғары энтропиялық логикалық сынақтар мен нақты код негізінде шыңдалған',
      description: 'Интернетті жай ғана қорыту емес — KentaevAI 2.0 миллиондаған күрделі синтетикалық дилеммаларда және архитектураларды қайта құруда сыналған.',
      kicker: 'ҚҰНДЫЛЫҚ · ШЕБЕРЛІК',
      cta: 'Келесі қағидат',
      metrics: [
        { label: 'Оқыту FLOPs', value: '2.4e25' },
        { label: 'Логика сынағы', value: '94.8 MMLU' },
        { label: 'Код генерациясы', value: '92.6 HumanEval' }
      ]
    },
    ru: {
      title: 'Опыт, ведущий к истинному мастерству',
      tagline: 'Обучен на высокоэнтропийных тестах рассуждений и реальных кодовых базах',
      description: 'Не просто пересказ интернета — KentaevAI 2.0 закалялся на миллионах синтетических дилемм, рефакторинге реальных архитектур и решении сложных задач.',
      kicker: 'ЦЕННОСТЬ · МАСТЕРСТВО',
      cta: 'Следующий принцип',
      metrics: [
        { label: 'FLOPs претрейна', value: '2.4e25' },
        { label: 'Тест рассуждений', value: '94.8 MMLU' },
        { label: 'Генерация кода', value: '92.6 HumanEval' }
      ]
    },
    en: {
      title: 'The Reps That Led to Pure Mastery',
      tagline: 'Trained on high-entropy reasoning benchmarks & real codebases',
      description: 'Not merely summarizing the web—KentaevAI 2.0 was forged across millions of synthetic adversarial dilemmas, refactoring real architectures, and solving non-trivial edge cases.',
      kicker: 'WE VALUE · MASTERY',
      cta: 'Next Principle',
      metrics: [
        { label: 'Pre-Training FLOPs', value: '2.4e25' },
        { label: 'Reasoning Benchmark', value: '94.8 MMLU' },
        { label: 'Code Synthesis', value: '92.6 HumanEval' }
      ]
    }
  },
  horizon: {
    kk: {
      title: 'Шексіз контекст көкжиегі',
      tagline: 'Архитектуралық ережелеріңізді ешқашан ұмытпайтын тұрақты жады векторлары',
      description: 'Көп репозиторийлі толық кодовые базаларды, тұтынушылардың барлық тарихын және сағаттық аудио жазбаларды контекст жоғалтусыз сақтайды.',
      kicker: 'ҚҰНДЫЛЫҚ · ЖАДЫ',
      cta: 'Келесі қағидат',
      metrics: [
        { label: 'Жұмыс терезесі', value: '2,000,000' },
        { label: 'Еске түсіру', value: '100% Ине/Шөп' },
        { label: 'Вектор кэші', value: '<1мс Сұрау' }
      ]
    },
    ru: {
      title: 'Бесконечный горизонт контекста',
      tagline: 'Векторы постоянной памяти, которые никогда не забывают ваши правила',
      description: 'Храните целые кодовые базы из множества репозиториев, полную историю клиентов и многочасовые аудиозаписи без обрезания контекста.',
      kicker: 'ЦЕННОСТЬ · ПАМЯТЬ',
      cta: 'Следующий принцип',
      metrics: [
        { label: 'Рабочее окно', value: '2,000,000' },
        { label: 'Точность извлечения', value: '100% Игла' },
        { label: 'Векторный кэш', value: '<1мс Запрос' }
      ]
    },
    en: {
      title: 'The Infinite Context Horizon',
      tagline: 'Persistent memory vectors that never forget your architectural rules',
      description: 'Retain entire multi-repository codebases, complete customer histories, and multi-hour voice transcriptions without context truncation.',
      kicker: 'WE VALUE · MEMORY',
      cta: 'Next Principle',
      metrics: [
        { label: 'Working Window', value: '2,000,000' },
        { label: 'Recall Accuracy', value: '100% at Needle' },
        { label: 'Vector Cache', value: 'Sub-1ms Query' }
      ]
    }
  },
  reasoning: {
    kk: {
      title: 'Тәуелсіз когнитивті ядро',
      tagline: 'Бұлыңғыр шынайы ниеттерді автономиялы түрде кезең-кезеңмен талдау',
      description: 'Мүмкін емес нәрсені сұраңыз: KentaevAI 2.0 көпсатылы жоспарлар құрады, гипотезаларды тексереді және тәжірибеде сыналған нәтиже береді.',
      kicker: 'ҚҰНДЫЛЫҚ · ТӘУЕЛСІЗДІК',
      cta: 'Келесі қағидат',
      metrics: [
        { label: 'Автономия тереңдігі', value: '64 Қадам' },
        { label: 'Өзін-өзі түзету', value: '99.1%' },
        { label: 'Құралдар шақыруы', value: '100% Мінсіз' }
      ]
    },
    ru: {
      title: 'Автономное когнитивное ядро',
      tagline: 'Самостоятельная декомпозиция сложных реальных намерений',
      description: 'Спросите о невозможном: KentaevAI 2.0 строит многоэтапные планы, проверяет гипотезы, тестирует граничные условия и дает надежные решения.',
      kicker: 'ЦЕННОСТЬ · НЕЗАВИСИМОСТЬ',
      cta: 'Следующий принцип',
      metrics: [
        { label: 'Глубина автономии', value: '64 Шага' },
        { label: 'Самокоррекция', value: '99.1%' },
        { label: 'Вызовы инструментов', value: 'Без сбоев' }
      ]
    },
    en: {
      title: 'The Independent Cognitive Core',
      tagline: 'Autonomous decomposition of ambiguous real-world intent',
      description: 'Ask for the impossible: KentaevAI 2.0 generates multi-stage plans, tests hypotheses, validates boundary cases, and produces battle-tested deliverables.',
      kicker: 'WE VALUE · INDEPENDENCE',
      cta: 'Next Principle',
      metrics: [
        { label: 'Autonomous Depth', value: '64 Steps' },
        { label: 'Self-Correction', value: '99.1%' },
        { label: 'Tool Dispatch', value: 'Zero Drop' }
      ]
    }
  },
  simplification: {
    kk: {
      title: 'Қарапайымдандыру шеберлігі',
      tagline: 'Шектен тыс күрделілікті мөлдір тазалық пен талғамға сығу',
      description: 'Басқалар 5000 жол артық жүк қалдырған жерде, KentaevAI 2.0 тек ең маңызды өзекті қалдырады. Артық қоспасыз таза, сенімді код.',
      kicker: 'ҚҰНДЫЛЫҚ · ҚАРАПАЙЫМДЫЛЫҚ',
      cta: 'Келесі қағидат',
      metrics: [
        { label: 'Код қысқалығы', value: '-65% Артық' },
        { label: 'Нұсқаулықты орындау', value: '99.9%' },
        { label: 'Артық шығын', value: '0.0мс' }
      ]
    },
    ru: {
      title: 'Способность упрощать',
      tagline: 'Сжатие предельной сложности в кристальную элегантность',
      description: 'Там, где другие оставляют 5000 строк перегруженного кода, KentaevAI 2.0 выделяет самую суть. Чистая, модульная архитектура без лишнего мусора.',
      kicker: 'ЦЕННОСТЬ · ПРОСТОТА',
      cta: 'Следующий принцип',
      metrics: [
        { label: 'Лаконичность кода', value: '-65% Мусора' },
        { label: 'Следование инструкциям', value: '99.9%' },
        { label: 'Накладные расходы', value: '0.0мс' }
      ]
    },
    en: {
      title: 'The Capacity to Simplify',
      tagline: 'Compressing extreme complexity into crystalline elegance',
      description: 'Where others leave you with 5,000 unmaintainable lines of bloat, KentaevAI 2.0 distills the essential core. Clean, readable, modular architecture with zero fluff.',
      kicker: 'WE VALUE · SIMPLICITY',
      cta: 'Next Principle',
      metrics: [
        { label: 'Code Conciseness', value: '-65% Slop' },
        { label: 'Instruction Adherence', value: '99.9%' },
        { label: 'Execution Overhead', value: '0.0ms' }
      ]
    }
  },
  sovereignty: {
    kk: {
      title: 'Сыртқы тәуелділіктерсіз егемендік',
      tagline: 'Деректердің толық құпиялылығы және оқшауланған орналастыру',
      description: 'Телеметрия сыртқа шықпайды. Бұлтта, жеке серверлерде немесе жергілікті станцияда толық жабық контурда қауіпсіз жұмыс істеңіз.',
      kicker: 'ҚҰНДЫЛЫҚ · ЕГЕМЕНДІК',
      cta: 'Келесі қағидат',
      metrics: [
        { label: 'Дерек ағуы', value: '0.00' },
        { label: 'Офлайн қолдау', value: 'Docker / Жергілікті' },
        { label: 'Оқшауланған контур', value: '100%' }
      ]
    },
    ru: {
      title: 'Стремление к нулевой внешней зависимости',
      tagline: 'Полный суверенитет данных и автономное развертывание',
      description: 'Никаких утечек телеметрии. Запуск в вашем защищенном облаке, локальном сервере или рабочей станции с полной изоляцией.',
      kicker: 'ЦЕННОСТЬ · СУВЕРЕНИТЕТ',
      cta: 'Следующий принцип',
      metrics: [
        { label: 'Утечка данных', value: '0.00' },
        { label: 'Локальный деплой', value: 'Docker / Нативно' },
        { label: 'Изолированный контур', value: '100%' }
      ]
    },
    en: {
      title: 'The Drive for Zero External Dependencies',
      tagline: 'Full data sovereignty and standalone deployment',
      description: 'No telemetry leaks. Run completely private in your secure cloud, on-prem cluster, or local workstation with ironclad boundary enforcement.',
      kicker: 'WE VALUE · SOVEREIGNTY',
      cta: 'Next Principle',
      metrics: [
        { label: 'Telemetry Exfiltration', value: '0.00' },
        { label: 'Local Deployment', value: 'Docker & Bare' },
        { label: 'Air-Gapped Ready', value: '100%' }
      ]
    }
  },
  finale: {
    kk: {
      title: 'Біз сіздің жеңісіңіз үшін талмай жұмыс істейміз',
      tagline: 'Болашақтың өнімдерін KentaevAI 2.0 көмегімен бүгін құрыңыз',
      description: 'Ескірген модельдерден асып түсіңіз. Кванттық жылдамдықпен ойлау, үздіксіз мультимодальды қабылдау және шығармашылық еркіндікті сезініңіз.',
      kicker: 'БОЛАШАҚ ОСЫ ЖЕРДЕН БАСТАЛАДЫ',
      cta: 'KentaevAI 2.0 іске қосу',
      metrics: [
        { label: 'Белсенді қолданушылар', value: '140,000+' },
        { label: 'Шешілген сұраулар', value: '82,000,000' },
        { label: 'Орташа баға', value: '4.98 / 5.0' }
      ]
    },
    ru: {
      title: 'Мы неустанно работаем ради ваших побед',
      tagline: 'Создавайте продукты будущего вместе с KentaevAI 2.0 уже сегодня',
      description: 'Выйдите за рамки устаревших моделей. Ощутите квантовую скорость рассуждений, непрерывное мультимодальное восприятие и свободу творчества.',
      kicker: 'БУДУЩЕЕ НАЧИНАЕТСЯ ЗДЕСЬ',
      cta: 'Запустить KentaevAI 2.0',
      metrics: [
        { label: 'Активные пользователи', value: '140,000+' },
        { label: 'Решено задач', value: '82,000,000' },
        { label: 'Средняя оценка', value: '4.98 / 5.0' }
      ]
    },
    en: {
      title: 'We power you, relentlessly, to win',
      tagline: 'Build the products of tomorrow with KentaevAI 2.0 today',
      description: 'Step beyond legacy models. Experience quantum-fast reasoning, continuous multimodal perception, and fluid creative agency.',
      kicker: 'THE FUTURE STARTS HERE',
      cta: 'Deploy KentaevAI 2.0',
      metrics: [
        { label: 'Active Users', value: '140,000+' },
        { label: 'Queries Solved', value: '82,000,000' },
        { label: 'Avg Rating', value: '4.98 / 5.0' }
      ]
    }
  }
};

export const UI_TRANSLATIONS = {
  chapter: {
    kk: 'БӨЛІМ',
    ru: 'ГЛАВА',
    en: 'CHAPTER'
  },
  prev: {
    kk: 'Алдыңғы',
    ru: 'Назад',
    en: 'Prev'
  },
  next: {
    kk: 'Келесі',
    ru: 'Вперед',
    en: 'Next'
  },
  auto: {
    kk: 'Авто',
    ru: 'Авто',
    en: 'Auto'
  },
  swipeTip: {
    kk: 'Экранды сырғытыңыз немесе саусақпен бөлшектерді қозғаңыз',
    ru: 'Свайпните экран или проведите пальцем для взаимодействия с частицами',
    en: 'Swipe screen or drag finger to interact with quantum particles'
  },
  terminalBtn: {
    kk: 'Терминал 2.0',
    ru: 'Терминал 2.0',
    en: 'Terminal 2.0'
  },
  mobileFloatingTerminal: {
    kk: 'Терминал 2.0',
    ru: 'Терминал 2.0',
    en: 'Terminal 2.0'
  }
};
