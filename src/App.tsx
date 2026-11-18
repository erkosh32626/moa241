/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  List,
  X,
  CheckCircle2,
  Keyboard,
} from 'lucide-react';
import { clampSlideIndex } from './utils/mathLab';
import { Slide1Hero } from './components/slides/Slide1Hero';
import { Slide2Psychology } from './components/slides/Slide2Psychology';
import { Slide3Methods } from './components/slides/Slide3Methods';
import { Slide4LiveLab } from './components/slides/Slide4LiveLab';
import { Slide5Lifehacks } from './components/slides/Slide5Lifehacks';
import { Slide6CaseStudies } from './components/slides/Slide6CaseStudies';
import { Slide7QuizAndTips } from './components/slides/Slide7QuizAndTips';

export interface SlideMeta {
  index: number;
  numberLabel: string;
  shortNavLabel: string;
  title: string;
  subtitle: string;
}

export const SLIDES_META: SlideMeta[] = [
  {
    index: 0,
    numberLabel: '01',
    shortNavLabel: '1. Кіріспе',
    title: 'Титулдық бет: Туынды және оның қолданылуы',
    subtitle: 'Қоғамдық-гуманитарлық бағытта оқытудың инновациялық әдістемесі',
  },
  {
    index: 1,
    numberLabel: '02',
    shortNavLabel: '2. Психология',
    title: 'Мәселе және ҚГБ оқушысының психологиясы',
    subtitle: 'Абстракция қорқынышы және «База + Сторителлинг + Визуал» шешімі',
  },
  {
    index: 2,
    numberLabel: '03',
    shortNavLabel: '3. Үш әдіс',
    title: 'Туындыны түсіндірудің 3 тиімді әдісі',
    subtitle: 'Спидометр, Тау шыңы (Экстремум) және Фейнманның 15 секундтық ережесі',
  },
  {
    index: 3,
    numberLabel: '04',
    shortNavLabel: '4. Зертхана',
    title: 'Интерактивті зертхана: «Тірі туынды графигі»',
    subtitle: 'Жанама сызық, f\'(x) мәні және функцияның өсу/кему трендтері',
  },
  {
    index: 4,
    numberLabel: '05',
    shortNavLabel: '5. Лайфхактар',
    title: 'Жаттаусыз түсінуге арналған 4 «Лайфхак»',
    subtitle: 'Дәреже секіреді, Тас қозғалмайды, Матрёшка және Жиі кететін қателіктер',
  },
  {
    index: 5,
    numberLabel: '06',
    shortNavLabel: '6. Кейс-стади',
    title: 'Гуманитарларға арналған «WOW» есептер',
    subtitle: 'Блогер табысы, Психологиялық зейін қисығы және Кітап тиражы экономикасы',
  },
  {
    index: 6,
    numberLabel: '07',
    shortNavLabel: '7. Қорытынды & Тест',
    title: 'Әдістемелік ұсыныстар және Интерактивті Мини-тест',
    subtitle: 'Мұғалімге 4 нақты бағдар және аудиториямен 3 сұрақтық блиц-квиз',
  },
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const slideParam = params.get('slide');
      if (slideParam) {
        const parsed = parseInt(slideParam, 10);
        if (!isNaN(parsed)) {
          return clampSlideIndex(parsed - 1, SLIDES_META.length);
        }
      }
      if (params.get('autostart') === '1') {
        return 1;
      }
    }
    return 0;
  });

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const goToSlide = useCallback((idx: number) => {
    setCurrentSlide(clampSlideIndex(idx, SLIDES_META.length));
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => clampSlideIndex(prev + 1, SLIDES_META.length));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => clampSlideIndex(prev - 1, SLIDES_META.length));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Keyboard navigation (ArrowLeft / ArrowRight / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isSliderOrInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT');

      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        return;
      }

      if (isSliderOrInput) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, isMenuOpen]);

  const progressPercentage = Math.round(((currentSlide + 1) / SLIDES_META.length) * 100);

  // Top Bar Contract: Zone 1 (1-line brand), Zone 2 (5 concise nav links), Zone 3 (1 primary action button)
  const topNavIndices = [0, 1, 3, 5, 6];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0B1021] text-[#F8F6F0] relative selection:bg-amber-500/30 selection:text-amber-200">
      {/* Subtle Top Linear Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#131B33] z-40">
        <div
          className="h-full bg-amber-500 transition-all duration-200"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Top Navigation Bar (Strict 3-Zone Contract) */}
      <header className="sticky top-1 z-30 bg-[#0B1021]/90 backdrop-blur-md border-b border-[#F8F6F0]/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => goToSlide(0)}
          className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#F8F6F0] hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Туынды · ҚГБ Әдістемесі
        </button>

        {/* Zone 2: 5 concise single-line text links */}
        <nav
          aria-label="Негізгі слайдтар навигациясы"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300"
        >
          {topNavIndices.map((idx) => {
            const slide = SLIDES_META[idx];
            const isActive = currentSlide === idx;
            return (
              <button
                key={slide.index}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
                  isActive
                    ? 'text-amber-400 font-bold border-b-2 border-amber-400'
                    : 'hover:text-[#F8F6F0]'
                }`}
              >
                {slide.shortNavLabel}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action Button (Slide Index Drawer Trigger) */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-expanded={isMenuOpen}
            aria-label="Слайдтар тізімі мәзірін ашу"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-md shadow-amber-500/15"
          >
            <List className="w-4 h-4" />
            <span>Слайдтар тізімі ({currentSlide + 1}/7)</span>
          </button>
        </div>
      </header>

      {/* Main Slide Stage */}
      <main className="flex-1 flex items-center py-4 sm:py-6">
        {currentSlide === 0 && (
          <Slide1Hero
            onStart={() => goToSlide(1)}
            onJumpToLab={() => goToSlide(3)}
          />
        )}
        {currentSlide === 1 && <Slide2Psychology />}
        {currentSlide === 2 && <Slide3Methods />}
        {currentSlide === 3 && <Slide4LiveLab />}
        {currentSlide === 4 && <Slide5Lifehacks />}
        {currentSlide === 5 && <Slide6CaseStudies />}
        {currentSlide === 6 && <Slide7QuizAndTips />}
      </main>

      {/* Bottom Presentation Control Deck (Progress Bar, Slide Number, Prev / Next Buttons) */}
      <footer className="sticky bottom-0 z-30 bg-[#0B1021]/95 backdrop-blur-md border-t border-[#F8F6F0]/10 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Left: Slide Number & Title */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-math text-xs sm:text-sm font-bold text-amber-300 bg-[#131B33] px-3 py-1.5 rounded-lg border border-amber-500/30 whitespace-nowrap shrink-0">
              Слайд {currentSlide + 1} / {SLIDES_META.length}
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-300 truncate hidden sm:inline">
              {SLIDES_META[currentSlide].title}
            </span>
          </div>

          {/* Center: Interactive 7-Segment Slide Progress Bar */}
          <div
            role="group"
            aria-label="Слайдтар прогресс-бары"
            className="hidden md:flex items-center gap-1.5"
          >
            {SLIDES_META.map((s) => {
              const isCurrent = s.index === currentSlide;
              const isPast = s.index < currentSlide;
              return (
                <button
                  key={s.index}
                  type="button"
                  onClick={() => goToSlide(s.index)}
                  aria-label={`${s.index + 1}-слайдқа өту: ${s.title}`}
                  aria-current={isCurrent ? 'step' : undefined}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    isCurrent
                      ? 'w-10 bg-amber-400'
                      : isPast
                      ? 'w-5 bg-amber-500/45 hover:bg-amber-400/75'
                      : 'w-5 bg-[#1E293B] hover:bg-slate-600'
                  }`}
                />
              );
            })}
          </div>

          {/* Right: Алдыңғы / Келесі Navigation Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="hidden xl:inline-flex items-center gap-1 text-xs text-slate-400 mr-2 font-math">
              <Keyboard className="w-3.5 h-3.5" />
              <span>← / →</span>
            </span>

            <button
              type="button"
              onClick={goPrev}
              disabled={currentSlide === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                currentSlide === 0
                  ? 'bg-[#131B33]/40 text-slate-500 border-[#F8F6F0]/5 cursor-not-allowed'
                  : 'bg-[#131B33] hover:bg-[#1C2747] text-[#F8F6F0] border-[#F8F6F0]/15 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Алдыңғы</span>
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={currentSlide === SLIDES_META.length - 1}
              className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 ${
                currentSlide === SLIDES_META.length - 1
                  ? 'bg-[#131B33]/40 text-slate-500 border border-[#F8F6F0]/5 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow-md shadow-amber-500/15'
              }`}
            >
              <span>Келесі</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* Quick Slide Index Drawer Modal */}
      {isMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Барлық слайдтар тізімі"
          className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
        >
          <div className="w-full max-w-md bg-[#131B33] border-l border-[#F8F6F0]/15 h-full flex flex-col justify-between p-6 overflow-y-auto shadow-2xl">
            <div>
              <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-[#F8F6F0]/12">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Интерактивті мазмұн
                  </div>
                  <h2 className="text-xl font-bold text-[#F8F6F0]">
                    Слайдтар тізімі (7 слайд)
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Слайдтар мәзірін жабу"
                  className="p-2 rounded-xl bg-[#0B1021] hover:bg-[#1C2747] text-slate-300 border border-[#F8F6F0]/12 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2.5">
                {SLIDES_META.map((slide) => {
                  const isCurrent = slide.index === currentSlide;
                  return (
                    <button
                      key={slide.index}
                      type="button"
                      onClick={() => goToSlide(slide.index)}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isCurrent
                          ? 'bg-amber-500/15 border-amber-400 text-[#F8F6F0]'
                          : 'bg-[#0B1021]/80 hover:bg-[#0B1021] border-[#F8F6F0]/10 text-slate-200'
                      }`}
                    >
                      <div>
                        <div className="font-math text-xs font-bold text-amber-400 mb-1">
                          {slide.numberLabel}-СЛАЙД
                        </div>
                        <div className="text-sm font-bold text-[#F8F6F0] mb-1">
                          {slide.title}
                        </div>
                        <div className="text-xs text-slate-400 leading-relaxed">
                          {slide.subtitle}
                        </div>
                      </div>
                      {isCurrent && (
                        <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F8F6F0]/10 flex items-center justify-between text-xs text-slate-400">
              <span>Пернетақтамен басқару: ← / →</span>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="font-semibold text-amber-300 hover:underline cursor-pointer"
              >
                Жабу (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
