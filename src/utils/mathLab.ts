export type TrendStatus = 'increasing' | 'peak' | 'decreasing';

export interface DerivativePointState {
  x: number;
  fx: number;
  fPrime: number;
  status: TrendStatus;
  statusLabel: string;
  pedagogicalHint: string;
  tangentStart: { x: number; y: number };
  tangentEnd: { x: number; y: number };
  angleDegrees: number;
}

/**
 * Evaluates f(x) = -0.5x^2 + 4x
 */
export function evaluateParabola(x: number): number {
  const raw = -0.5 * x * x + 4 * x;
  return Number(raw.toFixed(4));
}

/**
 * Evaluates f'(x) = -x + 4
 */
export function evaluateDerivative(x: number): number {
  const raw = -x + 4;
  return Number(raw.toFixed(4));
}

/**
 * Computes full geometric & pedagogical state for a given x in [0, 8]
 */
export function getDerivativePointState(x: number, spanDelta = 1.6): DerivativePointState {
  const clampedX = Math.max(0, Math.min(8, Number(x.toFixed(2))));
  const fx = evaluateParabola(clampedX);
  const fPrime = evaluateDerivative(clampedX);

  let status: TrendStatus = 'peak';
  let statusLabel = 'Шың / Максимум! (f\'(x) = 0)';
  let pedagogicalHint =
    'Туынды нөлге тең: функция өсуін тоқтатып, ең биік экстремум (максимум) нүктесіне жетті. Жанама сызық OX осіне параллель (горизонталь).';

  if (fPrime > 0.001) {
    status = 'increasing';
    statusLabel = 'Өсіп жатыр (Оң тренд)';
    pedagogicalHint =
      'f\'(x) > 0: Функция жоғары өрлеп барады. Жанама сызық жоғары бағытталған, яғни өзгеру жылдамдығы оң таңбалы.';
  } else if (fPrime < -0.001) {
    status = 'decreasing';
    statusLabel = 'Төмендеп жатыр (Теріс тренд)';
    pedagogicalHint =
      'f\'(x) < 0: Функция шыңнан асып, төмен құлдилап барады. Жанама сызық төмен еңкейген, өзгеру жылдамдығы теріс.';
  }

  const x1 = clampedX - spanDelta;
  const y1 = fx + fPrime * (x1 - clampedX);
  const x2 = clampedX + spanDelta;
  const y2 = fx + fPrime * (x2 - clampedX);

  const angleDegrees = Number((Math.atan(fPrime) * (180 / Math.PI)).toFixed(1));

  return {
    x: clampedX,
    fx,
    fPrime,
    status,
    statusLabel,
    pedagogicalHint,
    tangentStart: { x: Number(x1.toFixed(4)), y: Number(y1.toFixed(4)) },
    tangentEnd: { x: Number(x2.toFixed(4)), y: Number(y2.toFixed(4)) },
    angleDegrees,
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  contextHint: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Егер компанияның табыс графигі ең биік шыңына (максимум нүктесіне) жетсе, сол нүктедегі туындының мәні нешеге тең болады?',
    contextHint: '«Тау шыңы мен Аңғар» әдісін еске түсіріңіз: шыңның дәл төбесінде жанама қалай орналасады?',
    options: [
      'f\'(x) = 0 (Жанама горизонталь)',
      'f\'(x) > 0 (Оң және ең үлкен мән)',
      'f\'(x) < 0 (Теріс мәнге ауысады)',
      'Туындыны есептеу мүмкін емес',
    ],
    correctIndex: 0,
    explanation: 'Дұрыс! Ең биік шыңда (экстремум нүктесінде) өсу тоқтап, төмендеу әлі басталмайды, сондықтан лездік өзгеру жылдамдығы f\'(x) = 0 болады.',
  },
  {
    id: 2,
    question: 'Блогердің жаңа видеосының қаралым функциясы V(t) болса, V\'(t) туындысы гуманитарлық тілмен нені білдіреді?',
    contextHint: '«Инстаграм және Спидометр» аналогиясы бойынша ойланыңыз.',
    options: [
      'Бір аптада жиналған барлық қаралым санын',
      'Дәл қазіргі сәттегі қаралымның өсу жылдамдығын (тренд қарқынын)',
      'Видеоның ұзақтығы мен лайктардың орташа арифметикалық мәнін',
      'Жазылушылардың жалпы санын',
    ],
    correctIndex: 1,
    explanation: 'Тамаша! Туынды жалпы жиналған санды емес, дәл сол мезеттегі өзгеру жылдамдығын (спидометр көрсеткішін немесе тренд қарқынын) көрсетеді.',
  },
  {
    id: 3,
    question: '«Тас қозғалмайды» лайфхаки бойынша кез келген тұрақты санның (мысалы, C = 1500) туындысы неге тең?',
    contextHint: 'Егер шама уақыт өте келе мүлдем өзгермесе, оның өзгеру жылдамдығы қандай?',
    options: [
      '1-ге тең',
      '1500x-ке тең',
      '0-ге тең (өзгеріс жоқ)',
      '-1500-ге тең',
    ],
    correctIndex: 2,
    explanation: 'Дәл солай! Тұрақты сан — орнынан қозғалмайтын тас сияқты. Ол өзгермейтіндіктен, оның өзгеру жылдамдығы (туындысы) әрқашан 0-ге тең: C\' = 0.',
  },
];

export function calculateQuizScore(selectedAnswers: Record<number, number>): {
  answeredCount: number;
  correctCount: number;
  totalQuestions: number;
  percentage: number;
} {
  const totalQuestions = QUIZ_QUESTIONS.length;
  let answeredCount = 0;
  let correctCount = 0;

  for (const q of QUIZ_QUESTIONS) {
    const picked = selectedAnswers[q.id];
    if (picked !== undefined) {
      answeredCount += 1;
      if (picked === q.correctIndex) {
        correctCount += 1;
      }
    }
  }

  const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  return { answeredCount, correctCount, totalQuestions, percentage };
}

export function clampSlideIndex(index: number, totalSlides: number): number {
  if (totalSlides <= 0) return 0;
  return Math.max(0, Math.min(totalSlides - 1, index));
}
