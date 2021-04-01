import test from 'ava';

import pagr, { Page, Separator } from './index';

const p = (n, c: boolean = false): Page => ({ page: n, current: c, type: 'page' });
const s = (): Separator => ({ type: 'separator' });

test('pagr - returns an array', (t) => {
  t.true(Array.isArray(pagr(0, 5, 7)));
});

test('pagr - returns a list from 1 - 5 when max is greater than bound', (t) => {
  t.deepEqual(pagr(0, 5, 7), [p(1, true), p(2), p(3), p(4), p(5)]);
});

test('pagr - returns a list from 1 - 5 when max is equal to the bound', (t) => {
  t.deepEqual(pagr(0, 5, 5), [p(1, true), p(2), p(3), p(4), p(5)]);
});

test('pagr - returns a list with one separator when current is at least 4 away from start', (t) => {
  t.deepEqual(pagr(4, 5, 4), [p(1), s(), p(3), p(4), p(5, true)]);
});

test('pagr - returns a list with one separator when current is at least 4 away from end', (t) => {
  t.deepEqual(pagr(1, 8, 5), [p(1), p(2, true), p(3), p(4), s(), p(8)]);
});

test('pagr - returns a list with two separators when there is at least 4 from start and end', (t) => {
  t.deepEqual(pagr(4, 10, 5), [p(1), s(), p(4), p(5, true), p(6), s(), p(10)]);
});
