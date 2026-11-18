import React, { useState } from 'react';
import { RotateCw, Zap, ShieldAlert, Layers, Box } from 'lucide-react';

interface LifehackCard {
  id: string;
  num: string;
  title: string;
  formulaFront: string;
  metaphorQuestion: string;
  backExplanation: string;
  workedExamples: string[];
  mnemonicRule: string;
}

const LIFEHACKS: LifehackCard[] = [
  {
    id: 'power',
    num: '01',
    title: '«Дәреже секіреді» ережесі',
    formulaFront: '(xⁿ)\' = n · xⁿ⁻¹',
    metaphorQuestion: 'Дәрежелік функцияның туындысын қалай 2 секундта шатаспай табамыз?',
    backExplanation:
      'Үстінде тұрған n дәрежесі парашютпен функцияның алдына секіріп түседі, ал өзі секірген соң бұрынғы қабаты 1 сатыға азаяды (n - 1).',
    workedExamples: [
      '(x⁵)\' = 5 · x⁴  (5 алдына секірді, үстінде 4 қалды)',
      '(x²)\' = 2 · x¹ = 2x',
      '(3x⁴)\' = 3 · 4x³ = 12x³',
    ],
    mnemonicRule: 'Алдына секірт → Дәрежені бірге азайт!',
  },
  {
    id: 'constant',
    num: '02',
    title: '«Тас қозғалмайды» ережесі',
    formulaFront: "C' = 0  (мұндағы C — тұрақты сан)",
    metaphorQuestion: 'Неге кез келген бос тұрған санның (мысалы, 7, 100 немесе π) туындысы нөлге тең?',
    backExplanation:
      'Тұрақты сан — жол жиегінде орнынан қозғалмай жатқан тас. Уақыт өтсе де ол өзгермейді, ал қозғалмайтын дененің жылдамдығы (туындысы) нөлге тең!',
    workedExamples: [
      "(2026)' = 0  (сан өзгермейді → жылдамдығы 0)",
      "(x² + 50)' = 2x + 0 = 2x",
      "Ескерту: (5x)' = 5 (мұнда 5 — x-тің коэффициенті, жеке тас емес!)",
    ],
    mnemonicRule: 'Айнымалы x жоқ па? Демек ол тас → Туындысы 0!',
  },
  {
    id: 'chain',
    num: '03',
    title: '«Тізбекті ереже — Матрёшка»',
    formulaFront: "[f(g(x))]' = f'(g(x)) · g'(x)",
    metaphorQuestion: 'Күрделі функцияның туындысын тапқанда оқушылар неге ішкі бөлігін ұмытып кетеді?',
    backExplanation:
      'Күрделі функция — ішінде тағы бір қуыршағы бар Матрёшка (немесе қырыққабат). Алдымен сыртқы қабығын ашамыз (сыртқы туынды), сосын міндетті түрде ішкі өзегінің туындысына көбейтеміз.',
    workedExamples: [
      '[(2x + 3)⁵]\' = 5(2x + 3)⁴ · (2x + 3)\' = 5(2x + 3)⁴ · 2 = 10(2x + 3)⁴',
      '[sin(3x)]\' = cos(3x) · (3x)\' = 3cos(3x)',
    ],
    mnemonicRule: 'Сыртқы қабығын аршы × Ішкі өзегінің туындысына көбейт!',
  },
  {
    id: 'traps',
    num: '04',
    title: '«Жиі кететін 3 қателік» (Анти-қақпан)',
    formulaFront: "(eˣ)' = eˣ   |   (ln x)' = 1/x   |   f'(x) = 0",
    metaphorQuestion: 'Оқушылар емтиханда ең жиі шатастыратын 3 тұзақтан қалай сақтанамыз?',
    backExplanation:
      '1) eˣ — «айнаға қараған вампир», туынды алсаң да өзі өзгермейді.\n2) ln x — логарифм бөлшекке айналады: 1/x.\n3) f(x)=0 (графиктің OX осін қиюы) мен f\'(x)=0 (графиктің шыңы) — екеуі екі бөлек нүкте!',
    workedExamples: [
      'Қате: (eˣ)\' = x·eˣ⁻¹ ❌   →   Дұрысы: (eˣ)\' = eˣ ✅',
      'Қате: (ln x)\' = x ❌      →   Дұрысы: (ln x)\' = 1/x ✅',
      'Экстремум іздегенде f(x)=0 емес, тек f\'(x)=0 шешіледі! ✅',
    ],
    mnemonicRule: 'eˣ — өзгермейтін суперқаһарман, ал f\'(x)=0 — тек шың мен аңғар!',
  },
];

export const Slide5Lifehacks: React.FC = () => {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({
    power: false,
    constant: false,
    chain: false,
    traps: false,
  });

  const toggleFlip = (id: string) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const flipAll = () => {
    const allFlipped = LIFEHACKS.every((c) => flipped[c.id]);
    const nextState: Record<string, boolean> = {};
    for (const c of LIFEHACKS) {
      nextState[c.id] = !allFlipped;
    }
    setFlipped(nextState);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-300/90 font-medium mb-2">
            <span>05. Мнемоника және ассоциативті жады</span>
            <span aria-hidden="true">·</span>
            <span>Карточканы басып, ереженің «құпиясын» айналдырып көріңіз</span>
          </div>
          <h2
            className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F6F0] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Жаттаусыз түсінуге арналған 4 «Лайфхак»
          </h2>
        </div>

        <button
          type="button"
          onClick={flipAll}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#131B33] hover:bg-[#1C2747] text-xs sm:text-sm font-semibold text-amber-300 border border-[#F8F6F0]/15 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <RotateCw className="w-4 h-4" />
          <span>
            {LIFEHACKS.every((c) => flipped[c.id])
              ? 'Барлығын алдыңғы бетіне қайтару'
              : 'Барлық 4 карточканы аудару'}
          </span>
        </button>
      </div>

      {/* 2x2 Grid of Interactive Flip Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LIFEHACKS.map((card) => {
          const isFlipped = !!flipped[card.id];
          return (
            <div
              key={card.id}
              className="rounded-2xl bg-[#131B33]/90 border border-[#F8F6F0]/15 hover:border-amber-400/50 transition-all duration-200 shadow-xl flex flex-col justify-between p-6"
            >
              {/* Top Row: Badge + Flip Trigger Button */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="inline-flex items-center gap-2 text-xs font-math text-amber-300">
                  {card.id === 'power' && <Zap className="w-4 h-4 text-amber-400" />}
                  {card.id === 'constant' && <Box className="w-4 h-4 text-emerald-400" />}
                  {card.id === 'chain' && <Layers className="w-4 h-4 text-indigo-400" />}
                  {card.id === 'traps' && <ShieldAlert className="w-4 h-4 text-rose-400" />}
                  <span>ЛАЙФХАК #{card.num}</span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleFlip(card.id)}
                  aria-pressed={isFlipped}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isFlipped
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-[#0B1021] text-amber-300 border border-amber-500/30 hover:bg-amber-500/15'
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{isFlipped ? 'Формула бетіне қайту' : 'Лайфхакты ашу (Аудару)'}</span>
                </button>
              </div>

              {/* Card Body toggles between Front (Concept & Formula) and Back (Visual Explanation & Examples) */}
              {!isFlipped ? (
                <div
                  onClick={() => toggleFlip(card.id)}
                  className="cursor-pointer flex-1 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#F8F6F0] mb-3">
                      {card.title}
                    </h3>

                    <div className="my-4 py-4 px-5 rounded-xl bg-[#0B1021] border border-[#F8F6F0]/12 font-math text-lg sm:text-xl font-bold text-amber-300 text-center">
                      {card.formulaFront}
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {card.metaphorQuestion}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#F8F6F0]/10 flex items-center justify-between text-xs text-slate-400">
                    <span>Мысалдар мен ассоциацияны көру үшін басыңыз</span>
                    <span className="text-amber-400 font-semibold">1/2 бет →</span>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-amber-300">{card.title} — Түсіндірме</h3>
                      <span className="font-math text-xs text-slate-400">{card.formulaFront}</span>
                    </div>

                    <p className="text-sm text-[#F8F6F0] leading-relaxed whitespace-pre-line mb-4 bg-[#0B1021]/60 p-3.5 rounded-xl border border-[#F8F6F0]/10">
                      {card.backExplanation}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        Сабақтағы нақты мысалдар:
                      </div>
                      {card.workedExamples.map((ex, i) => (
                        <div
                          key={i}
                          className="font-math text-xs sm:text-sm text-slate-200 bg-[#0B1021] px-3 py-2 rounded-lg border border-[#F8F6F0]/10"
                        >
                          {ex}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F8F6F0]/10 flex items-center justify-between gap-2 text-xs">
                    <span className="text-amber-200 font-semibold">
                      Есте сақтау коды: «{card.mnemonicRule}»
                    </span>
                    <span className="text-slate-400 shrink-0">2/2 бет</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
