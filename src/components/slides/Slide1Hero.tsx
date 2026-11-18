import React, { useState } from 'react';
import { ArrowRight, Compass, BookOpen, TrendingUp } from 'lucide-react';
import { getDerivativePointState, evaluateParabola } from '../../utils/mathLab';

interface Slide1Props {
  onStart: () => void;
  onJumpToLab: () => void;
}

export const Slide1Hero: React.FC<Slide1Props> = ({ onStart, onJumpToLab }) => {
  const [previewX, setPreviewX] = useState<number>(2.4);
  const state = getDerivativePointState(previewX, 1.3);

  // Build SVG path for parabola f(x) = -0.5x^2 + 4x on [0, 8]
  // Coordinate mapping: x in [0, 8] -> svgX in [40, 440], y in [-1, 10] -> svgY in [250, 30]
  const toSvgX = (x: number) => 40 + (x / 8) * 400;
  const toSvgY = (y: number) => 230 - (y / 8) * 170;

  const curvePoints: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const xv = i / 10;
    const yv = evaluateParabola(xv);
    curvePoints.push(`${i === 0 ? 'M' : 'L'} ${toSvgX(xv).toFixed(1)} ${toSvgY(yv).toFixed(1)}`);
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left Column: Editorial Presentation Title & Philosophy */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-[#131B33]/85 border border-[#F8F6F0]/12 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-amber-300/90 font-medium tracking-wide mb-6">
              <span>Пән: Алгебра және анализ бастамаларын оқыту әдістемесі</span>
              <span aria-hidden="true">·</span>
              <span>Қоғамдық-гуманитарлық бағыт (10–11 сынып)</span>
            </div>

            <h1
              className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F8F6F0] leading-[1.08] tracking-tight mb-5"
              style={{ textWrap: 'balance' }}
            >
              Туынды және оның қолданылуы
            </h1>

            <p className="text-lg sm:text-xl text-[#F8F6F0]/85 font-medium leading-relaxed mb-6">
              Қоғамдық-гуманитарлық бағытта (ҚГБ) оқытудың инновациялық әдістемесі
            </p>

            <div className="my-6 py-4 px-5 rounded-xl bg-[#0B1021]/70 border border-amber-500/30">
              <p className="text-xs uppercase tracking-widest text-amber-400/90 font-semibold mb-1">
                Әдістемелік ұран
              </p>
              <p className="font-editorial italic text-2xl sm:text-3xl text-amber-200 font-semibold">
                «Құрғақ формуладан — мағыналы түсінуге!»
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Гуманитарлық бейіндегі оқушылар үшін математикалық анализ — абстрактілі символдар жиынтығы емес,{' '}
              <strong className="text-[#F8F6F0] font-semibold">
                өзгеріс динамикасын, трендтерді және өмірлік процестердің шарықтау шегін
              </strong>{' '}
              сипаттайтын тірі тіл.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#F8F6F0]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onStart}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/20 transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Бастау</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={onJumpToLab}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#1A2442] hover:bg-[#233058] text-[#F8F6F0] border border-[#F8F6F0]/15 font-semibold text-sm transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Тірі зертхананы ашу (4-слайд)</span>
              </button>
            </div>

            <div className="text-xs text-slate-400 font-math">
              7 интерактивті модуль · Пернетақта: ← / →
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Concept Teaser Card */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#131B33]/85 border border-[#F8F6F0]/12 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-xs font-semibold tracking-wider uppercase text-amber-300/90">
                Интерактивті модель үлгісі
              </span>
              <span className="font-math text-xs text-slate-300 bg-[#0B1021]/80 px-2.5 py-1 rounded-md border border-[#F8F6F0]/10">
                f(x) = -0.5x² + 4x
              </span>
            </div>

            <h2 className="text-xl font-bold text-[#F8F6F0] mb-2">
              Жанама мен өзгеру жылдамдығы
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
              Нүктені жылжытып көріңіз: гуманитар оқушы формуладан бұрын қисықтың көлбеу бұрышын көзбен көріп сезінеді.
            </p>

            {/* Mini Interactive SVG Graph */}
            <div className="bg-[#0B1021] border border-[#F8F6F0]/10 rounded-xl p-3 mb-4">
              <svg
                viewBox="0 0 480 260"
                className="w-full h-48 sm:h-52 overflow-visible"
                role="img"
                aria-label="Туындының геометриялық мағынасын көрсететін мини-график"
              >
                {/* Grid lines */}
                {[0, 2, 4, 6, 8].map((g) => (
                  <g key={g}>
                    <line
                      x1={toSvgX(g)}
                      y1={25}
                      x2={toSvgX(g)}
                      y2={230}
                      stroke="rgba(248,246,240,0.07)"
                      strokeDasharray="3 3"
                    />
                    <text
                      x={toSvgX(g)}
                      y={248}
                      textAnchor="middle"
                      fill="rgba(248,246,240,0.45)"
                      fontSize="11"
                      fontFamily="IBM Plex Mono, monospace"
                    >
                      x={g}
                    </text>
                  </g>
                ))}
                <line
                  x1={30}
                  y1={230}
                  x2={455}
                  y2={230}
                  stroke="rgba(248,246,240,0.25)"
                  strokeWidth="1.5"
                />

                {/* Parabola Curve */}
                <path
                  d={curvePoints.join(' ')}
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Tangent Line */}
                <line
                  x1={toSvgX(state.tangentStart.x)}
                  y1={toSvgY(state.tangentStart.y)}
                  x2={toSvgX(state.tangentEnd.x)}
                  y2={toSvgY(state.tangentEnd.y)}
                  stroke={
                    state.status === 'increasing'
                      ? '#10B981'
                      : state.status === 'peak'
                      ? '#F59E0B'
                      : '#F43F5E'
                  }
                  strokeWidth="2.5"
                />

                {/* Active Point */}
                <circle
                  cx={toSvgX(state.x)}
                  cy={toSvgY(state.fx)}
                  r="7"
                  fill="#F8F6F0"
                  stroke={
                    state.status === 'increasing'
                      ? '#10B981'
                      : state.status === 'peak'
                      ? '#F59E0B'
                      : '#F43F5E'
                  }
                  strokeWidth="3.5"
                />
              </svg>

              {/* Mini Slider */}
              <div className="mt-2 pt-2 border-t border-[#F8F6F0]/10 flex items-center gap-3">
                <label
                  htmlFor="hero-preview-slider"
                  className="text-xs font-math text-slate-300 whitespace-nowrap"
                >
                  x = {state.x.toFixed(1)}
                </label>
                <input
                  id="hero-preview-slider"
                  type="range"
                  min="0"
                  max="8"
                  step="0.2"
                  value={previewX}
                  onChange={(e) => setPreviewX(parseFloat(e.target.value))}
                  aria-label="Алдын ала қарау графигіндегі x мәні"
                  className="math-slider w-full"
                />
                <span className="text-xs font-math font-semibold text-amber-300 whitespace-nowrap">
                  f'(x) = {state.fPrime > 0 ? `+${state.fPrime.toFixed(1)}` : state.fPrime.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* 3 Pillars Footer inside Card */}
          <div className="grid grid-cols-3 gap-2.5 pt-2">
            <div className="bg-[#0B1021]/60 border border-[#F8F6F0]/10 rounded-xl p-3">
              <BookOpen className="w-4 h-4 text-amber-400 mb-1.5" />
              <div className="text-xs font-bold text-[#F8F6F0]">Сторителлинг</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Өмірлік метафоралар</div>
            </div>
            <div className="bg-[#0B1021]/60 border border-[#F8F6F0]/10 rounded-xl p-3">
              <Compass className="w-4 h-4 text-emerald-400 mb-1.5" />
              <div className="text-xs font-bold text-[#F8F6F0]">Визуализация</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Тірі жанама графигі</div>
            </div>
            <div className="bg-[#0B1021]/60 border border-[#F8F6F0]/10 rounded-xl p-3">
              <TrendingUp className="w-4 h-4 text-indigo-400 mb-1.5" />
              <div className="text-xs font-bold text-[#F8F6F0]">Қолданбалы кейс</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Медиа, психология</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
