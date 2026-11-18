import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateParabola,
  evaluateDerivative,
  getDerivativePointState,
  calculateQuizScore,
  clampSlideIndex,
} from './mathLab';

test('evaluateParabola and evaluateDerivative calculate f(x) = -0.5x^2 + 4x accurately', () => {
  // At x = 0: f(0) = 0, f'(0) = 4
  assert.equal(evaluateParabola(0), 0);
  assert.equal(evaluateDerivative(0), 4);

  // At x = 2: f(2) = -0.5(4) + 8 = 6, f'(2) = 2
  assert.equal(evaluateParabola(2), 6);
  assert.equal(evaluateDerivative(2), 2);

  // At x = 4 (Vertex / Maximum): f(4) = -0.5(16) + 16 = 8, f'(4) = 0
  assert.equal(evaluateParabola(4), 8);
  assert.equal(evaluateDerivative(4), 0);

  // At x = 6: f(6) = -0.5(36) + 24 = 6, f'(6) = -2
  assert.equal(evaluateParabola(6), 6);
  assert.equal(evaluateDerivative(6), -2);

  // At x = 8: f(8) = -0.5(64) + 32 = 0, f'(8) = -4
  assert.equal(evaluateParabola(8), 0);
  assert.equal(evaluateDerivative(8), -4);
});

test('getDerivativePointState identifies increasing, peak, and decreasing states correctly', () => {
  const incState = getDerivativePointState(1.5);
  assert.equal(incState.status, 'increasing');
  assert.equal(incState.fPrime, 2.5);

  const peakState = getDerivativePointState(4);
  assert.equal(peakState.status, 'peak');
  assert.equal(peakState.fx, 8);
  assert.equal(peakState.fPrime, 0);
  assert.equal(peakState.tangentStart.y, 8);
  assert.equal(peakState.tangentEnd.y, 8);

  const decState = getDerivativePointState(6.5);
  assert.equal(decState.status, 'decreasing');
  assert.equal(decState.fPrime, -2.5);
});

test('calculateQuizScore tallies answers and percentages properly', () => {
  const empty = calculateQuizScore({});
  assert.equal(empty.answeredCount, 0);
  assert.equal(empty.correctCount, 0);

  const partial = calculateQuizScore({ 1: 0, 2: 0 });
  assert.equal(partial.answeredCount, 2);
  assert.equal(partial.correctCount, 1);

  const perfect = calculateQuizScore({ 1: 0, 2: 1, 3: 2 });
  assert.equal(perfect.answeredCount, 3);
  assert.equal(perfect.correctCount, 3);
  assert.equal(perfect.percentage, 100);
});

test('clampSlideIndex bounds slide navigation safely within [0, totalSlides - 1]', () => {
  assert.equal(clampSlideIndex(-1, 7), 0);
  assert.equal(clampSlideIndex(0, 7), 0);
  assert.equal(clampSlideIndex(4, 7), 4);
  assert.equal(clampSlideIndex(7, 7), 6);
  assert.equal(clampSlideIndex(99, 7), 6);
});
