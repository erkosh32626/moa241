import React, { useState } from 'react';
import { AlertTriangle, Sparkles, Brain, Eye, MessageSquareQuote, CheckCircle2, XCircle } from 'lucide-react';

export const Slide2Psychology: React.FC = () => {
  const [mode, setMode] = useState<'traditional' | 'innovative'>('innovative');

  const barriers = [
    {
      num: '01',
      title: 'Шектен тыс абстракция қорқынышы',
      problem:
        '«Шектер (lim)», «Δx → 0», «дифференциал» ұғымдарын бірден символдық тілде беру гуманитар оқушыда когнитивті тосқауыл тудырады.',
      bridge: 'Образды ойлау арқылы алдымен құбылыстың мағынасын (өзгеріс қарқынын) сезіндіру.',
    },
    {
      num: '02',
      title: 'Өмірлік контексттің болмауы',
      problem:
        'Тарих, әдебиет, медиа немесе психологияға бейім оқушы «y = x³ - 3x функциясын зертте» деген тапсырманың өзіне не үшін керек екенін түсінбейді.',
      bridge: 'Есептерді әлеуметтік желі тренді, зейін қисығы және экономикалық пайда тіліне аудару.',
    },
    {
      num: '03',
      title: 'Механикалық формула жаттау',
      problem:
        'Туынды кестесін мағынасыз жаттау тез ұмытылады және сәл өзгерген есепте оқушыны тығырыққа тірейді.',
      bridge: '«Дәреже секіреді», «Тас қозғалмайды», «Матрёшка» сияқты визуалды-мнемоникалық ассоциациялар.',
    },
  ];

  const comparisonRows = [
    {
      criterion: 'Сабақтың басталуы (Кіріспе)',
      traditional:
        'Тақтаға f\'(x) = lim (Δx→0) [f(x+Δx) - f(x)] / Δx анықтамасын жазып, дәптерге көшірту.',
      innovative:
        'Инстаграмдағы видеоның жалпы қаралымы мен дәл қазіргі минуттағы тренд жылдамдығын салыстырудан бастау.',
    },
    {
      criterion: 'Негізгі түсіндіру құралы',
      traditional:
        'Туынды формулалар кестесін жаттату және бірсарынды 20 алгебралық өрнекті түрлендіру.',
      innovative:
        'Интерактивті графикте нүктені жылжытып, жанаманың қалай көтеріліп, шыңда тегістелетінін көзбен көрсету.',
    },
    {
      criterion: 'Бекіту тапсырмалары',
      traditional:
        '«Функцияның кризистік нүктелері мен монотондылық аралықтарын табыңыз» — абстрактілі есеп.',
      innovative:
        '«45 минуттық сабақтың қай минутында оқушылардың зейіні ең жоғары деңгейге жетеді?» — зерттеу кейсі.',
    },
    {
      criterion: 'Оқушының эмоциялық күйі',
      traditional:
        'Мазасыздық, «мен гуманитармын, маған математика қонбайды» деген жасанды стереотип.',
      innovative:
        'Қызығушылық, «Еврика!» эффектісі, математиканы өз мамандығының талдау құралы ретінде қабылдау.',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-300/90 font-medium mb-2">
          <span>02. Проблемалық талдау</span>
          <span aria-hidden="true">·</span>
          <span>ҚГБ оқушысының когнитивті ерекшелігі</span>
        </div>
        <h2
          className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F6F0] tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Неге гуманитарлық бағыттағы оқушылар туындыдан қорқады?
        </h2>
      </div>

      {/* Top Row: 3 Psychological Barriers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {barriers.map((item) => (
          <div
            key={item.num}
            className="bg-[#131B33]/85 border border-[#F8F6F0]/12 rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 font-math mb-3">
                <span>КЕДЕРГІ #{item.num}</span>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-[#F8F6F0] mb-2.5">{item.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">{item.problem}</p>
            </div>
            <div className="pt-3.5 border-t border-[#F8F6F0]/10">
              <div className="text-xs font-semibold text-emerald-400 mb-1">Әдістемелік көпір:</div>
              <p className="text-xs text-[#F8F6F0]/90 leading-relaxed">{item.bridge}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Formula Banner: База + Сторителлинг + Визуал */}
      <div className="bg-[#131B33] border border-amber-500/30 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#F8F6F0]/10">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1.5">
              Бірыңғай әдістемелік формула
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xl sm:text-2xl font-bold text-[#F8F6F0]">
              <span className="inline-flex items-center gap-2 bg-[#0B1021] px-3.5 py-1.5 rounded-xl border border-[#F8F6F0]/12">
                <Brain className="w-5 h-5 text-indigo-400" />
                <span>База</span>
              </span>
              <span className="text-amber-400 font-math">+</span>
              <span className="inline-flex items-center gap-2 bg-[#0B1021] px-3.5 py-1.5 rounded-xl border border-[#F8F6F0]/12">
                <MessageSquareQuote className="w-5 h-5 text-amber-400" />
                <span>Сторителлинг</span>
              </span>
              <span className="text-amber-400 font-math">+</span>
              <span className="inline-flex items-center gap-2 bg-[#0B1021] px-3.5 py-1.5 rounded-xl border border-[#F8F6F0]/12">
                <Eye className="w-5 h-5 text-emerald-400" />
                <span>Визуал</span>
              </span>
            </div>
          </div>

          {/* Interactive Toggle Switch: Дәстүрлі тәсіл vs Жаңа әдістеме */}
          <div className="flex flex-col sm:items-end gap-2">
            <span className="text-xs text-slate-400">
              Салыстыру режимін ауыстырыңыз:
            </span>
            <div
              role="group"
              aria-label="Оқыту тәсілін салыстыру ауыстырғышы"
              className="inline-flex items-center p-1.5 rounded-xl bg-[#0B1021] border border-[#F8F6F0]/15"
            >
              <button
                type="button"
                onClick={() => setMode('traditional')}
                aria-pressed={mode === 'traditional'}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                  mode === 'traditional'
                    ? 'bg-rose-500/20 text-rose-200 border border-rose-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-[#F8F6F0]'
                }`}
              >
                Дәстүрлі тәсіл
              </button>
              <button
                type="button"
                onClick={() => setMode('innovative')}
                aria-pressed={mode === 'innovative'}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                  mode === 'innovative'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-[#F8F6F0]'
                }`}
              >
                Жаңа әдістеме (ҚГБ)
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Comparison Content */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {comparisonRows.map((row, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-5 border transition-colors duration-200 ${
                mode === 'innovative'
                  ? 'bg-[#0B1021]/80 border-emerald-500/30'
                  : 'bg-[#0B1021]/80 border-rose-500/30'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {row.criterion}
                </span>
                {mode === 'innovative' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Тиімді шешім</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Ескі қалып</span>
                  </span>
                )}
              </div>

              <p className="text-sm sm:text-base text-[#F8F6F0] font-medium leading-relaxed">
                {mode === 'innovative' ? row.innovative : row.traditional}
              </p>

              <div className="mt-3 pt-2.5 border-t border-[#F8F6F0]/10 text-xs text-slate-400">
                {mode === 'innovative' ? (
                  <span>Дәстүрліде: «{row.traditional}»</span>
                ) : (
                  <span>Жаңа әдістемеде: «{row.innovative}»</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
