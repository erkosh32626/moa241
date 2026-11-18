import React, { useState } from 'react';
import { Video, BrainCircuit, BookMarked, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  story: string;
  functionModel: string;
  variableMeaning: string;
  question: string;
  solutionSteps: string[];
  finalConclusion: string;
}

const CASES: CaseStudy[] = [
  {
    id: 'blogger',
    tag: 'Медиа және Маркетинг (Оптимизация)',
    title: '1. Блогер мен Таргет кейсі',
    story:
      'Жас блогер парақшасындағы жарнама бағасын тым қымбаттатса клиенттер азаяды, ал тым арзандатса жалпы табысы төмендейді. Оның айлық табыс функциясы мына модельмен сипатталады:',
    functionModel: 'P(x) = -2x² + 40x  (мың теңге)',
    variableMeaning: 'мұндағы x — айына алынатын жарнамалық интеграциялар саны.',
    question: 'Ең жоғары табыс әкелетін жарнама саны (x) және максималды табыс мөлшері қандай?',
    solutionSteps: [
      "1-қадам (Туынды табу): P'(x) = (-2x² + 40x)' = -4x + 40",
      "2-қадам (Шыңды / экстремумды табу): P'(x) = 0  ⟹  -4x + 40 = 0  ⟹  4x = 40  ⟹  x = 10 жарнама",
      '3-қадам (Ең жоғары табысты есептеу): P(10) = -2·(10)² + 40·10 = -200 + 400 = 200 мың теңге',
    ],
    finalConclusion:
      'Оңтайлы шешім: Айына дәл 10 жарнама алғанда блогер ең жоғары 200 000 ₸ табысқа жетеді!',
  },
  {
    id: 'psychology',
    tag: 'Когнитивті психология және Педагогика',
    title: '2. Психология / Зейін қисығы кейсі',
    story:
      '45 минуттық сабақ барысында оқушының жаңа ақпаратты қабылдау тиімділігі (зейін концентрациясы) уақыт бойынша мына заңдылықпен өзгереді:',
    functionModel: 'E(t) = -t² + 30t + 100  (зейін индексі)',
    variableMeaning: 'мұндағы t — сабақ басталғаннан кейінгі уақыт (минутпен, 0 ≤ t ≤ 45).',
    question: 'Мұғалім сабақтың қай минутында ең маңызды әрі күрделі тақырыпты түсіндіруі керек?',
    solutionSteps: [
      "1-қадам (Зейіннің өзгеру жылдамдығы): E'(t) = (-t² + 30t + 100)' = -2t + 30",
      "2-қадам (Максимум нүктесі): E'(t) = 0  ⟹  -2t + 30 = 0  ⟹  2t = 30  ⟹  t = 15-минут!",
      '3-қадам (Максималды зейін деңгейі): E(15) = -(15)² + 30·15 + 100 = -225 + 450 + 100 = 325 балл',
    ],
    finalConclusion:
      'Педагогикалық қорытынды: Сабақтың 15-минутында оқушы зейіні шарықтау шегіне (325 балл) жетеді!',
  },
  {
    id: 'economics',
    tag: 'Баспа ісі және Экономика',
    title: '3. Экономика / Кітап тиражы кейсі',
    story:
      'Баспа үйі жаңа қазақ әдебиеті антологиясын басып шығаруда. Тираж көбейген сайын қойма мен тарату шығыны артады. Таза пайда функциясы:',
    functionModel: 'B(x) = -0.5x² + 12x - 10  (млн теңге)',
    variableMeaning: 'мұндағы x — басылып шыққан кітап тиражы (мың данамен).',
    question: 'Баспаға максималды пайда әкелетін оңтайлы тираж саны мен шекті пайда қандай?',
    solutionSteps: [
      "1-қадам (Шекті пайда / туынды): B'(x) = (-0.5x² + 12x - 10)' = -x + 12",
      "2-қадам (Оңтайлы тираж): B'(x) = 0  ⟹  -x + 12 = 0  ⟹  x = 12 мың дана кітап",
      '3-қадам (Максималды таза пайда): B(12) = -0.5·(144) + 12·12 - 10 = -72 + 144 - 10 = 62 млн теңге',
    ],
    finalConclusion:
      'Экономикалық шешім: 12 000 дана тираж шығарғанда баспа ең жоғары 62 млн ₸ таза пайда табады.',
  },
];

export const Slide6CaseStudies: React.FC = () => {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({
    blogger: false,
    psychology: false,
    economics: false,
  });

  const toggleSolution = (id: string) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-300/90 font-medium mb-2">
          <span>06. Қолданбалы сторителлинг және Кейс-стади</span>
          <span aria-hidden="true">·</span>
          <span>Оқушының болашақ мамандығымен тікелей байланыс</span>
        </div>
        <h2
          className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F6F0] tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Гуманитарларға арналған «WOW» есептер
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {CASES.map((c) => {
          const isShown = !!revealed[c.id];
          return (
            <div
              key={c.id}
              className="bg-[#131B33]/90 border border-[#F8F6F0]/14 rounded-2xl p-6 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-amber-300 font-medium mb-3">
                  <span>{c.tag}</span>
                  {c.id === 'blogger' && <Video className="w-4 h-4 text-amber-400 shrink-0" />}
                  {c.id === 'psychology' && <BrainCircuit className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {c.id === 'economics' && <BookMarked className="w-4 h-4 text-indigo-400 shrink-0" />}
                </div>

                <h3 className="text-xl font-bold text-[#F8F6F0] mb-3">{c.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">{c.story}</p>

                <div className="bg-[#0B1021] border border-[#F8F6F0]/12 rounded-xl p-3.5 mb-3">
                  <div className="font-math text-sm sm:text-base font-bold text-amber-300">
                    {c.functionModel}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{c.variableMeaning}</div>
                </div>

                <div className="text-sm font-semibold text-[#F8F6F0] mb-5">
                  Сұрақ: <span className="text-amber-200">{c.question}</span>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => toggleSolution(c.id)}
                  aria-expanded={isShown}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isShown
                      ? 'bg-[#0B1021] text-amber-300 border border-amber-500/40'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/15'
                  }`}
                >
                  {isShown ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span>Шешімін жасыру</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>Шешімін көрсету</span>
                    </>
                  )}
                </button>

                {isShown && (
                  <div className="mt-4 pt-4 border-t border-[#F8F6F0]/12 space-y-2.5">
                    {c.solutionSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="bg-[#0B1021]/90 border border-[#F8F6F0]/10 rounded-lg p-2.5 font-math text-xs text-slate-200 leading-relaxed"
                      >
                        {step}
                      </div>
                    ))}
                    <div className="bg-emerald-950/50 border border-emerald-500/40 rounded-xl p-3 flex items-start gap-2 text-xs text-emerald-200 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{c.finalConclusion}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
