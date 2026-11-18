import React, { useState } from 'react';
import { Gauge, Mountain, MessageCircle, ChevronDown, ChevronUp, Sparkles, Clock } from 'lucide-react';

interface MethodData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  coreFormula: string;
  shortHook: string;
  teacherScript: string;
  classroomActivity: string;
  visualExplanation: string;
  studentTakeaway: string;
}

const METHODS: MethodData[] = [
  {
    id: 'speedometer',
    number: '01',
    title: '«Инстаграм және Спидометр» әдісі',
    subtitle: 'Туындының физикалық және медиа мағынасы',
    coreFormula: "v(t) = S'(t)  ·  Тренд = Қаралым'(t)",
    shortHook:
      'Туынды — бұл жалпы жиналған сан емес, дәл қазіргі сәттегі өзгеру жылдамдығы мен қарқыны.',
    teacherScript:
      '«Екі видеоны елестетіңіздер: біріншісінде 1 миллион қаралым бар, бірақ ол 3 жыл бұрын салынған, қазір ешкім қарамайды (туындысы 0-ге жуық). Екіншісінде бар-жоғы 50 мың қаралым бар, бірақ минутына +5 000 адам қосылып жатыр (туындысы өте жоғары). Алгоритм қайсысын трендке шығарады? Әрине, туындысы үлкенін!»',
    classroomActivity:
      'Оқушыларға автокөліктің одометрі (жалпы жүрілген жол — функция f(t)) мен спидометрін (дәл қазіргі лездік жылдамдық — туынды f\'(t)) салыстыру тапсырылады.',
    visualExplanation:
      'f(t) = жалпы жиналған қаралым саны болса, f\'(t) = минутына қосылатын жаңа қаралым жылдамдығы.',
    studentTakeaway:
      'Оқушы туындыны «процестің дәл осы секундтағы пульсі мен тренд қарқыны» ретінде бірден түсінеді.',
  },
  {
    id: 'mountain',
    number: '02',
    title: '«Тау шыңы мен Аңғар» әдісі (Экстремум)',
    subtitle: 'Туындының геометриялық мағынасы және Ферма теоремасы',
    coreFormula: "f'(x₀) = 0  ⟹  Экстремум (Максимум / Минимум)",
    shortHook:
      'Тау басына шығып, төмен түсер сәтте аяқ астындағы жер бір секундқа тегістеледі — жанама горизонталь болады.',
    teacherScript:
      '«Сіз тауға өрмелеп келе жатырсыз: аяғыңыз жоғары бағытталған (f\'(x) > 0). Шыңның ең биік нүктесіне жеткен сәтте сіз енді жоғары да көтерілмейсіз, төмен де түспейсіз — табаныңыздың астындағы шаңғы горизонталь тұрады. Дәл осы сәтте көлбеулік нөлге тең: f\'(x) = 0!»',
    classroomActivity:
      'Қолмен ауада толқын сызып, шың мен ойыс (аңғар) нүктелерінде алақанды горизонталь қою арқылы кризистік нүктелерді дене қимылымен бекіту.',
    visualExplanation:
      'Өсу (f\'(x) > 0) → Шың / Тегістік (f\'(x) = 0) → Түсу (f\'(x) < 0) → Аңғар / Тегістік (f\'(x) = 0).',
    studentTakeaway:
      'Оқушы «неге максимум мен минимумды табу үшін туындыны нөлге теңестіреміз?» деген сұрақтың жауабын жаттамай-ақ біледі.',
  },
  {
    id: 'feynman',
    number: '03',
    title: '«Фейнман әдісі» (15 секундтық ереже)',
    subtitle: 'Гуманитарлық вербализация және ұғымды қарапайымдату',
    coreFormula: 'Күрделі термин  →  5-сынып оқушысына 15 секундта түсіндіру',
    shortHook:
      'Егер математикалық терминді 5-сынып оқушысы түсінетін қарапайым сөзбен айтып бере алмасаң — оны өзің де толық түсінбегенің.',
    teacherScript:
      '«Кітаптағы "функцияның өсімшесінің аргумент өсімшесіне қатынасының шегі" деген сөзді жабуға рұқсат! Енді жұбыңызға 15 секунд ішінде "туынды", "жанама", "экстремум" сөздерін бірде-бір формула қолданбай, күнделікті өмір мысалымен түсіндіріп шығыңыз.»',
    classroomActivity:
      '«15 секундтық микрофон» ойыны: оқушылар жұптасып, таймермен туынды ережелерін өз сөзімен, метафорамен қорғайды.',
    visualExplanation:
      'Академиялық анықтама → Өмірлік образ → Қарапайым сөйлем → Қайтадан математикалық символға оралу.',
    studentTakeaway:
      'Сөздік қоры бай гуманитар оқушылар өздерінің мықты қырын (тілдік шеберлігін) математиканы меңгеруге пайдаланады.',
  },
];

export const Slide3Methods: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    speedometer: true,
    mountain: false,
    feynman: false,
  });

  const [feynmanTimer, setFeynmanTimer] = useState<number | null>(null);

  const toggleCard = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen = METHODS.every((m) => expandedIds[m.id]);
    if (allOpen) {
      setExpandedIds({ speedometer: true, mountain: false, feynman: false });
    } else {
      setExpandedIds({ speedometer: true, mountain: true, feynman: true });
    }
  };

  const startFifteenSecondChallenge = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFeynmanTimer(15);
    const interval = window.setInterval(() => {
      setFeynmanTimer((curr) => {
        if (curr === null || curr <= 1) {
          window.clearInterval(interval);
          return 0;
        }
        return curr - 1;
      });
    }, 1000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-300/90 font-medium mb-2">
            <span>03. Авторлық әдістемелік қоржын</span>
            <span aria-hidden="true">·</span>
            <span>Карточканы басып, сабақта қолдану сценарийін ашыңыз</span>
          </div>
          <h2
            className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F6F0] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Туындыны түсіндірудің 3 тиімді әдісі
          </h2>
        </div>

        <button
          type="button"
          onClick={expandAll}
          className="px-4 py-2.5 rounded-xl bg-[#131B33] hover:bg-[#1C2747] text-xs sm:text-sm font-semibold text-amber-300 border border-[#F8F6F0]/15 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          {METHODS.every((m) => expandedIds[m.id])
            ? 'Барлығын жинау'
            : 'Барлық 3 әдісті толық ашу'}
        </button>
      </div>

      {/* 3 Interactive Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {METHODS.map((method) => {
          const isOpen = !!expandedIds[method.id];
          return (
            <div
              key={method.id}
              className={`rounded-2xl border transition-all duration-200 ${
                isOpen
                  ? 'bg-[#131B33] border-amber-500/45 shadow-2xl'
                  : 'bg-[#131B33]/70 border-[#F8F6F0]/12 hover:border-[#F8F6F0]/25'
              }`}
            >
              {/* Card Header Button */}
              <button
                type="button"
                onClick={() => toggleCard(method.id)}
                aria-expanded={isOpen}
                className="w-full text-left p-6 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="inline-flex items-center gap-2 text-xs font-math text-amber-300">
                    {method.id === 'speedometer' && <Gauge className="w-4 h-4 text-amber-400" />}
                    {method.id === 'mountain' && <Mountain className="w-4 h-4 text-emerald-400" />}
                    {method.id === 'feynman' && <MessageCircle className="w-4 h-4 text-indigo-400" />}
                    <span>ӘДІС #{method.number}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 bg-[#0B1021]/80 px-2.5 py-1 rounded-lg border border-[#F8F6F0]/10">
                    <span>{isOpen ? 'Жабу' : 'Сабақ сценарийін ашу'}</span>
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#F8F6F0] mb-1.5">{method.title}</h3>
                <p className="text-xs text-slate-400 mb-4">{method.subtitle}</p>

                <div className="py-2.5 px-3.5 rounded-xl bg-[#0B1021] border border-[#F8F6F0]/10 font-math text-xs sm:text-sm text-amber-200 mb-4">
                  {method.coreFormula}
                </div>

                <p className="text-sm text-[#F8F6F0]/90 leading-relaxed">{method.shortHook}</p>
              </button>

              {/* Expandable Teacher Implementation Panel */}
              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-[#F8F6F0]/10 space-y-4">
                  <div className="bg-[#0B1021]/80 rounded-xl p-4 border border-[#F8F6F0]/10">
                    <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1.5">
                      Мұғалімнің сабақтағы сөзі (Сторителлинг):
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                      {method.teacherScript}
                    </p>
                  </div>

                  <div className="bg-[#0B1021]/60 rounded-xl p-4 border border-[#F8F6F0]/10">
                    <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                      Сыныптағы практикалық әрекет:
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {method.classroomActivity}
                    </p>
                  </div>

                  {method.id === 'feynman' && (
                    <div className="bg-indigo-950/50 border border-indigo-400/30 rounded-xl p-4 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-indigo-200">
                          15 секундтық блиц-таймер
                        </div>
                        <div className="text-[11px] text-slate-300">
                          {feynmanTimer === null
                            ? 'Аудиториямен тірі тәжірибе жасап көріңіз'
                            : feynmanTimer === 0
                            ? 'Уақыт аяқталды! Түсіндіру қаншалықты сәтті шықты?'
                            : `Түсіндіруге қалған уақыт: ${feynmanTimer} сек`}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={startFifteenSecondChallenge}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{feynmanTimer && feynmanTimer > 0 ? `${feynmanTimer} с` : '15 с қосу'}</span>
                      </button>
                    </div>
                  )}

                  <div className="pt-2 flex items-start gap-2 text-xs text-amber-200/90">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Нәтиже:</strong> {method.studentTakeaway}
                    </span>
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
