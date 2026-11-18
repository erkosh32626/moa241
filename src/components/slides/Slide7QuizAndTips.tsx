import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Award, BookCheck, HelpCircle } from 'lucide-react';
import { QUIZ_QUESTIONS, calculateQuizScore } from '../../utils/mathLab';

export const Slide7QuizAndTips: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
  };

  const score = calculateQuizScore(selectedAnswers);

  const recommendations = [
    {
      num: '01',
      title: 'Терминнен бұрын — образ бен метафора',
      desc: 'Анықтаманы жаздырмас бұрын 3 минуттық өмірлік ситуация (спидометр, тренд қарқыны немесе тау шыңы) арқылы интуитивті түсінік қалыптастырыңыз.',
    },
    {
      num: '02',
      title: 'Есептеу күрделілігін емес, мағыналық талдауды бағалау',
      desc: 'ҚГБ сыныптарында үш қабатты бөлшек-рационал туындылардың орнына график бойынша функцияның өсу/кемуін және экстремумын оқу дағдысын басымдыққа қойыңыз.',
    },
    {
      num: '03',
      title: 'Визуалды динамика мен тірі графиктерді қолдану',
      desc: 'Статикалық тақтадағы суретпен шектелмей, жанаманың бұрыштық коэффициенті қалай өзгеретінін интерактивті слайд немесе GeoGebra арқылы көрсетіңіз.',
    },
    {
      num: '04',
      title: 'Сөзбен қорғау (Вербализация) рефлексиясы',
      desc: 'Сабақ соңында «Фейнманның 15 секундтық ережесі» бойынша оқушыларға шыққан сандық жауапты гуманитарлық тілде (экономика, медиа, психология) интерпретациялатыңыз.',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-2">
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-300/90 font-medium mb-1">
          <span>07. Қорытынды синтез және Кері байланыс</span>
          <span aria-hidden="true">·</span>
          <span>Мұғалімге бағдар және аудиториямен блиц-ойын</span>
        </div>
        <h2
          className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F8F6F0] tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Әдістемелік ұсыныстар және Интерактивті Мини-тест
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 4 Pedagogical Recommendations for Humanities Classes */}
        <div className="lg:col-span-5 bg-[#131B33]/90 border border-[#F8F6F0]/12 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm uppercase tracking-wider mb-3.5">
            <BookCheck className="w-4 h-4 text-amber-400" />
            <span>ҚГБ сыныптарына арналған 4 нақты ұсыныс</span>
          </div>

          <div className="space-y-2.5">
            {recommendations.map((rec) => (
              <div
                key={rec.num}
                className="bg-[#0B1021]/80 border border-[#F8F6F0]/10 rounded-xl p-3.5"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-math text-[11px] font-bold text-amber-400">
                    ҰСЫНЫС #{rec.num}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#F8F6F0] mb-1">{rec.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{rec.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3.5 border-t border-[#F8F6F0]/10 text-xs text-slate-300 leading-relaxed">
            <strong className="text-amber-300">Қорытынды түйін:</strong> Гуманитар оқушы математиканы жек көрмейді — ол тек мағынасыз жаттандылықты қабылдамайды.
          </div>
        </div>

        {/* Right Column: 3-Question Interactive Blitz Quiz */}
        <div className="lg:col-span-7 bg-[#131B33]/90 border border-[#F8F6F0]/12 rounded-2xl p-5 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-4 border-b border-[#F8F6F0]/10">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-0.5">
                Аудиториямен интерактивті блиц-квиз
              </div>
              <h3 className="text-lg font-bold text-[#F8F6F0]">
                Білімді тексеру: 3 сұрақ
              </h3>
            </div>

            <div className="flex items-center gap-2.5">
              <div
                aria-live="polite"
                className="inline-flex items-center gap-2 bg-[#0B1021] border border-amber-500/35 px-3.5 py-1.5 rounded-xl font-math text-xs sm:text-sm font-bold text-amber-300"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>
                  Ұпай: {score.correctCount} / {score.totalQuestions} ({score.percentage}%)
                </span>
              </div>

              {score.answeredCount > 0 && (
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B1021] hover:bg-[#1A2442] text-xs font-semibold text-slate-300 border border-[#F8F6F0]/15 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Қайта бастау</span>
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3.5">
            {QUIZ_QUESTIONS.map((q, qIdx) => {
              const pickedIndex = selectedAnswers[q.id];
              const isAnswered = pickedIndex !== undefined;
              const isCorrect = pickedIndex === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="bg-[#0B1021]/85 border border-[#F8F6F0]/12 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-[#F8F6F0] leading-snug">
                      {qIdx + 1}. {q.question}
                    </h4>
                    <span className="font-math text-xs text-slate-400 shrink-0">
                      {qIdx + 1}/3
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 mb-2.5 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{q.contextHint}</span>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isThisPicked = pickedIndex === optIdx;
                      const isThisRightAnswer = q.correctIndex === optIdx;

                      let btnStyle =
                        'bg-[#131B33] hover:bg-[#1C2747] text-slate-200 border-[#F8F6F0]/15';

                      if (isAnswered) {
                        if (isThisRightAnswer) {
                          btnStyle =
                            'bg-emerald-950/80 text-emerald-200 border-emerald-500 font-bold';
                        } else if (isThisPicked && !isThisRightAnswer) {
                          btnStyle =
                            'bg-rose-950/80 text-rose-200 border-rose-500 font-bold';
                        } else {
                          btnStyle =
                            'bg-[#131B33]/40 text-slate-400 border-[#F8F6F0]/5 opacity-70';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`text-left px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-2 ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isThisRightAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          {isAnswered && isThisPicked && !isThisRightAnswer && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div
                      className={`mt-3.5 p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2 ${
                        isCorrect
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                          : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <strong className="mr-1">
                          {isCorrect ? 'Дұрыс жауап!' : 'Қате таңдау.'}
                        </strong>
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
