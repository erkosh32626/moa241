import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Award, Sliders, RotateCcw } from 'lucide-react';
import { evaluateParabola, getDerivativePointState } from '../../utils/mathLab';

export const Slide4LiveLab: React.FC = () => {
  const [xValue, setXValue] = useState<number>(2.0);
  const state = getDerivativePointState(xValue, 1.7);

  // SVG viewport: 720 x 400
  // Coordinate system: x in [-0.5, 8.5], y in [-1.5, 9.5]
  const padLeft = 64;
  const padRight = 40;
  const padTop = 36;
  const padBottom = 52;
  const plotWidth = 720 - padLeft - padRight;
  const plotHeight = 400 - padTop - padBottom;

  const toSvgX = (x: number) => padLeft + (x / 8) * plotWidth;
  const toSvgY = (y: number) => padTop + plotHeight - (y / 9) * plotHeight;

  // Build smooth path for f(x) = -0.5x^2 + 4x on [0, 8]
  const pathPoints: string[] = [];
  const areaPoints: string[] = [`M ${toSvgX(0).toFixed(1)} ${toSvgY(0).toFixed(1)}`];
  for (let i = 0; i <= 160; i++) {
    const xv = (i / 160) * 8;
    const yv = evaluateParabola(xv);
    const sx = toSvgX(xv).toFixed(1);
    const sy = toSvgY(yv).toFixed(1);
    pathPoints.push(`${i === 0 ? 'M' : 'L'} ${sx} ${sy}`);
    areaPoints.push(`L ${sx} ${sy}`);
  }
  areaPoints.push(`L ${toSvgX(8).toFixed(1)} ${toSvgY(0).toFixed(1)} Z`);

  const statusColor =
    state.status === 'increasing'
      ? '#10B981'
      : state.status === 'peak'
      ? '#F59E0B'
      : '#F43F5E';

  const presets = [
    { label: 'Бастапқы өсу (x = 1.5)', val: 1.5 },
    { label: 'Шың / Максимум! (x = 4.0)', val: 4.0 },
    { label: 'Төмендеу (x = 6.5)', val: 6.5 },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-300/90 font-medium mb-1">
            <span>04. Интерактивті математикалық зертхана</span>
            <span aria-hidden="true">·</span>
            <span>Геометриялық мағына: f'(x) = tan(α) = k</span>
          </div>
          <h2
            className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F8F6F0] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Тірі туынды графигі: жанама және тренд
          </h2>
        </div>

        {/* Preset Quick Jump Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {presets.map((p) => (
            <button
              key={p.val}
              type="button"
              onClick={() => setXValue(p.val)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                Math.abs(xValue - p.val) < 0.05
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                  : 'bg-[#131B33] text-slate-200 border-[#F8F6F0]/15 hover:border-amber-400/50'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Zone Sandbox Layout (65% Interactive Stage / 35% Telemetry & Concept Deck) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Zone: Interactive SVG Graph + Slider */}
        <div className="lg:col-span-8 bg-[#131B33]/90 border border-[#F8F6F0]/12 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="font-math text-xs sm:text-sm font-semibold text-[#F8F6F0] bg-[#0B1021] px-3 py-1 rounded-lg border border-[#F8F6F0]/12">
                f(x) = -0.5x² + 4x
              </span>
              <span className="font-math text-xs sm:text-sm font-semibold text-amber-300 bg-[#0B1021] px-3 py-1 rounded-lg border border-amber-500/25">
                f'(x) = -x + 4
              </span>
            </div>

            <div className="text-xs text-slate-300 font-math">
              Көлбеу бұрышы: α ≈ {state.angleDegrees}°
            </div>
          </div>

          {/* SVG Coordinate Plane */}
          <div className="bg-[#0B1021] border border-[#F8F6F0]/12 rounded-xl p-2 sm:p-3">
            <svg
              viewBox="0 0 720 400"
              className="w-full h-56 sm:h-64 overflow-visible"
              role="img"
              aria-label="f(x) = -0.5x^2 + 4x параболасы және жылжымалы жанама сызық"
            >
              <defs>
                <linearGradient id="parabolaAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid Lines (y = 0..8) */}
              {[0, 2, 4, 6, 8].map((yv) => (
                <g key={`y-${yv}`}>
                  <line
                    x1={padLeft}
                    y1={toSvgY(yv)}
                    x2={720 - padRight}
                    y2={toSvgY(yv)}
                    stroke={yv === 0 ? 'rgba(248,246,240,0.35)' : 'rgba(248,246,240,0.08)'}
                    strokeWidth={yv === 0 ? '1.8' : '1'}
                    strokeDasharray={yv === 0 ? undefined : '4 4'}
                  />
                  <text
                    x={padLeft - 12}
                    y={toSvgY(yv) + 4}
                    textAnchor="end"
                    fill="rgba(248,246,240,0.55)"
                    fontSize="12"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    {yv}
                  </text>
                </g>
              ))}

              {/* Vertical Grid Lines (x = 0..8) */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((xv) => (
                <g key={`x-${xv}`}>
                  <line
                    x1={toSvgX(xv)}
                    y1={padTop}
                    x2={toSvgX(xv)}
                    y2={toSvgY(0)}
                    stroke={xv === 0 ? 'rgba(248,246,240,0.35)' : 'rgba(248,246,240,0.08)'}
                    strokeWidth={xv === 0 ? '1.8' : '1'}
                    strokeDasharray={xv === 0 ? undefined : '4 4'}
                  />
                  <text
                    x={toSvgX(xv)}
                    y={toSvgY(0) + 22}
                    textAnchor="middle"
                    fill="rgba(248,246,240,0.6)"
                    fontSize="12"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    {xv}
                  </text>
                </g>
              ))}

              {/* Axis Labels */}
              <text
                x={720 - padRight + 8}
                y={toSvgY(0) + 4}
                fill="#F8F6F0"
                fontSize="13"
                fontWeight="bold"
                fontFamily="IBM Plex Mono, monospace"
              >
                x
              </text>
              <text
                x={padLeft}
                y={padTop - 12}
                textAnchor="middle"
                fill="#F8F6F0"
                fontSize="13"
                fontWeight="bold"
                fontFamily="IBM Plex Mono, monospace"
              >
                f(x)
              </text>

              {/* Shaded Parabola Area */}
              <path d={areaPoints.join(' ')} fill="url(#parabolaAreaGrad)" />

              {/* Vertex Peak Marker at (4, 8) */}
              <circle
                cx={toSvgX(4)}
                cy={toSvgY(8)}
                r="4.5"
                fill="#F59E0B"
                opacity="0.65"
              />
              <text
                x={toSvgX(4)}
                y={toSvgY(8) - 14}
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontFamily="IBM Plex Mono, monospace"
              >
                Максимум (4; 8)
              </text>

              {/* Main Parabola Curve */}
              <path
                d={pathPoints.join(' ')}
                fill="none"
                stroke="#818CF8"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Dashed Coordinate Projection Lines for Current Point */}
              <line
                x1={toSvgX(state.x)}
                y1={toSvgY(0)}
                x2={toSvgX(state.x)}
                y2={toSvgY(state.fx)}
                stroke={statusColor}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.75"
              />
              <line
                x1={padLeft}
                y1={toSvgY(state.fx)}
                x2={toSvgX(state.x)}
                y2={toSvgY(state.fx)}
                stroke={statusColor}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.75"
              />

              {/* Live Tangent Line */}
              <line
                x1={toSvgX(state.tangentStart.x)}
                y1={toSvgY(state.tangentStart.y)}
                x2={toSvgX(state.tangentEnd.x)}
                y2={toSvgY(state.tangentEnd.y)}
                stroke={statusColor}
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Interactive Point on Curve */}
              <circle
                cx={toSvgX(state.x)}
                cy={toSvgY(state.fx)}
                r="9"
                fill="#0B1021"
                stroke={statusColor}
                strokeWidth="4"
              />
              <circle
                cx={toSvgX(state.x)}
                cy={toSvgY(state.fx)}
                r="3.5"
                fill="#F8F6F0"
              />

              {/* Floating Point Coordinate Callout inside SVG */}
              <g
                transform={`translate(${Math.min(
                  Math.max(toSvgX(state.x) - 70, padLeft + 10),
                  720 - padRight - 150
                )}, ${Math.max(toSvgY(state.fx) - 46, 12)})`}
              >
                <rect
                  width="144"
                  height="28"
                  rx="6"
                  fill="#131B33"
                  stroke={statusColor}
                  strokeWidth="1.5"
                />
                <text
                  x="72"
                  y="18"
                  textAnchor="middle"
                  fill="#F8F6F0"
                  fontSize="11.5"
                  fontWeight="600"
                  fontFamily="IBM Plex Mono, monospace"
                >
                  ({state.x.toFixed(1)}; {state.fx.toFixed(2)}) · k={state.fPrime.toFixed(1)}
                </text>
              </g>
            </svg>
          </div>

          {/* Interactive Slider Bar (x from 0 to 8) */}
          <div className="mt-4 bg-[#0B1021]/90 border border-[#F8F6F0]/12 rounded-xl p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <label
                htmlFor="lab-x-slider"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#F8F6F0]"
              >
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Аргумент мәнін өзгертіңіз (x = 0-ден 8-ге дейін):</span>
              </label>
              <div className="flex items-center gap-3">
                <span className="font-math text-base font-bold text-amber-300">
                  x = {state.x.toFixed(1)}
                </span>
                <button
                  type="button"
                  onClick={() => setXValue(4.0)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-amber-300 bg-[#131B33] px-2.5 py-1 rounded-lg border border-[#F8F6F0]/12 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Шыңға қою (x=4)</span>
                </button>
              </div>
            </div>

            <input
              id="lab-x-slider"
              type="range"
              min="0"
              max="8"
              step="0.1"
              value={xValue}
              onChange={(e) => setXValue(parseFloat(e.target.value))}
              aria-label="x аргументін 0 мен 8 аралығында өзгерту жылжытқышы"
              className="math-slider w-full"
            />

            <div className="flex justify-between text-[11px] font-math text-slate-400 mt-1.5">
              <span>x = 0 (Бастау)</span>
              <span>x = 2 (Өсу)</span>
              <span className="text-amber-300 font-semibold">x = 4 (Максимум: f'(4)=0)</span>
              <span>x = 6 (Кему)</span>
              <span>x = 8 (Соңы)</span>
            </div>
          </div>
        </div>

        {/* Right Zone: Live Calculations & Semantic Status Panel */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3">
          {/* Dynamic Status Banner (Green / Yellow / Red with explicit Icon + Text) */}
          <div
            className={`rounded-2xl p-4 sm:p-5 border transition-all duration-200 ${
              state.status === 'increasing'
                ? 'bg-emerald-950/45 border-emerald-500/50 text-emerald-100'
                : state.status === 'peak'
                ? 'bg-amber-950/50 border-amber-400/60 text-amber-100'
                : 'bg-rose-950/45 border-rose-500/50 text-rose-100'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider opacity-85">
                Функцияның ағымдағы күйі
              </span>
              {state.status === 'increasing' && <TrendingUp className="w-5 h-5 text-emerald-400" />}
              {state.status === 'peak' && <Award className="w-5 h-5 text-amber-400" />}
              {state.status === 'decreasing' && <TrendingDown className="w-5 h-5 text-rose-400" />}
            </div>

            <div className="text-lg sm:text-xl font-extrabold mb-1.5">
              {state.statusLabel}
            </div>

            <p className="text-xs leading-relaxed opacity-90">
              {state.pedagogicalHint}
            </p>
          </div>

          {/* Real-time Coordinate & Derivative Cards */}
          <div className="bg-[#131B33]/90 border border-[#F8F6F0]/12 rounded-2xl p-4 sm:p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Нақты уақыттағы есептеулер
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#0B1021] border border-[#F8F6F0]/10 rounded-xl p-3">
                <div className="text-[11px] text-slate-400 mb-0.5">Нүкте координатасы</div>
                <div className="font-math text-base font-bold text-[#F8F6F0]">
                  ({state.x.toFixed(1)}; {state.fx.toFixed(2)})
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 font-math">
                  x = {state.x.toFixed(1)}, y = {state.fx.toFixed(2)}
                </div>
              </div>

              <div className="bg-[#0B1021] border border-[#F8F6F0]/10 rounded-xl p-3">
                <div className="text-[11px] text-slate-400 mb-0.5">Туындының мәні f'(x)</div>
                <div
                  className={`font-math text-base font-bold ${
                    state.status === 'increasing'
                      ? 'text-emerald-400'
                      : state.status === 'peak'
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }`}
                >
                  f'({state.x.toFixed(1)}) = {state.fPrime > 0 ? `+${state.fPrime.toFixed(2)}` : state.fPrime.toFixed(2)}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 font-math">
                  k = tan(α) = {state.fPrime.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Step-by-step substitution proof */}
            <div className="bg-[#0B1021]/80 border border-[#F8F6F0]/10 rounded-xl p-3 font-math text-xs space-y-1 text-slate-200">
              <div className="text-slate-400 font-sans font-semibold mb-0.5">
                Формулаға қою қадамы:
              </div>
              <div>
                1) f({state.x.toFixed(1)}) = -0.5·({state.x.toFixed(1)})² + 4·({state.x.toFixed(1)}) ={' '}
                <strong className="text-[#F8F6F0]">{state.fx.toFixed(2)}</strong>
              </div>
              <div>
                2) f'({state.x.toFixed(1)}) = -{state.x.toFixed(1)} + 4 ={' '}
                <strong className="text-amber-300">{state.fPrime.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          {/* Teacher Presentation Tip */}
          <div className="bg-[#131B33]/75 border border-[#F8F6F0]/12 rounded-2xl p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              Мұғалімге әдістемелік нұсқау:
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Жылжытқышты <strong className="text-[#F8F6F0]">x = 4</strong> нүктесіне әкелгенде оқушылардан:
              «Жанама қандай күйге енді?» деп сұраңыз. Максималды биіктікте <strong className="text-amber-300">f'(4) = 0</strong> болады!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
