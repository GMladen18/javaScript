export interface Page {
  current?: boolean;
  page: number;
  type: 'page';
}

export interface Separator {
  type: 'separator';
}

const pg = (p: number, c: boolean = false): Page => ({ page: p, current: c, type: 'page' });
const s = (): Separator => ({ type: 'separator' });

const pagr = (
  current: number,
  bound: number,
  max: number,
  separator: string = '...',
): Array<Page | Separator> => {
  const pages = Array(bound)
    .fill(null)
    .map((v, idx) => idx + 1);
  if (bound <= max) {
    return pages.map((p, idx) => pg(p, current === idx));
  }

  const needFirstSep = max - 2 < current;
  const needLastSep = current < bound - max + 2;

  if (needFirstSep && !needLastSep) {
    return [
      pg(1, current === 0),
      s(),
      ...pages.map((p, idx) => pg(p, current === idx)).slice(bound - (max - 1)),
    ];
  }

  if (!needFirstSep && needLastSep) {
    return [
      ...pages.map((p, idx) => pg(p, current === idx)).slice(0, max - 1),
      s(),
      pg(bound, current === bound - 1),
    ];
  }

  const pgCount = max - 2;
  return [
    pg(1, current === 0),
    s(),
    ...pages
      .map((p, idx) => pg(p, current === idx))
      .slice(current - Math.floor(pgCount / 2), current + pgCount - 1),
    s(),
    pg(bound, current === bound - 1),
  ];
};

export default pagr;
