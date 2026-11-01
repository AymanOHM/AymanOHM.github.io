// Shared page behaviour: theme, live date, in-view drawing, home header/memo, timeline, demo.
const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

/* ---------- Theme ---------- */
function effectiveTheme(): 'light' | 'dark' {
  const set = root.getAttribute('data-theme');
  if (set === 'light' || set === 'dark') return set;
  return darkQuery.matches ? 'dark' : 'light';
}
function syncThemeButtons() {
  const cur = effectiveTheme();
  document.querySelectorAll<HTMLButtonElement>('[data-set-theme]').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.setTheme === cur));
  });
}
document.querySelectorAll<HTMLButtonElement>('[data-set-theme]').forEach((b) => {
  b.addEventListener('click', () => {
    const t = b.dataset.setTheme as 'light' | 'dark';
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) { /* storage unavailable */ }
    syncThemeButtons();
  });
});
darkQuery.addEventListener?.('change', syncThemeButtons);
syncThemeButtons();

/* ---------- Live date and weekday ring ---------- */
(() => {
  const now = new Date();
  const dayIdx = (now.getDay() + 6) % 7;
  const names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const pad = (n: number) => String(n).padStart(2, '0');
  const dateEl = document.querySelector('[data-date]');
  if (dateEl) dateEl.textContent = `${pad(now.getDate())}   /   ${pad(now.getMonth() + 1)}   /   ${String(now.getFullYear()).slice(2)}`;
  const wk = document.querySelector('.weekdays');
  if (wk) {
    wk.setAttribute('aria-label', `Today: ${names[dayIdx]}`);
    wk.querySelectorAll('span').forEach((s, i) => s.classList.toggle('today', i === dayIdx));
  }
})();

/* ---------- Draw annotations when a section enters the view (top < 80% vh), once ---------- */
const animSections = document.querySelectorAll<HTMLElement>('[data-sec]');
if ('IntersectionObserver' in window) {
  const seenIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('seen');
        seenIO.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -20% 0px' });
  animSections.forEach((s) => seenIO.observe(s));
} else {
  animSections.forEach((s) => s.classList.add('seen'));
}

/* ---------- Home: compact header and Memo No. by section ---------- */
const header = document.querySelector<HTMLElement>('.nb-header[data-compactable]');
if (header) {
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:60px;pointer-events:none';
  document.body.prepend(sentinel);
  new IntersectionObserver(([e]) => {
    header.classList.toggle('is-compact', !e.isIntersecting);
  }).observe(sentinel);

  const memoEl = document.querySelector('[data-memo]');
  const tabLinks = document.querySelectorAll<HTMLAnchorElement>('[data-tab]');
  const tabNames = ['Intro', 'Work', 'Learning', 'Contact'];
  const secs = Array.from(document.querySelectorAll<HTMLElement>('[data-sec]'));
  const setMemo = (n: number) => {
    if (memoEl) memoEl.textContent = String(n).padStart(2, '0');
    tabLinks.forEach((a) => {
      if (a.dataset.tab === tabNames[n - 1]) a.setAttribute('aria-current', 'true');
      else if (tabNames.includes(a.dataset.tab || '')) a.removeAttribute('aria-current');
    });
  };
  // Current memo = the last section whose top is at most 180px below the viewport top.
  const updateMemo = () => {
    let n = 1;
    secs.forEach((s, i) => { if (s.getBoundingClientRect().top <= 180) n = i + 1; });
    setMemo(n);
  };
  // Re-check whenever a section crosses a 1px band at 180px, or the page returns to the top.
  let bandIO: IntersectionObserver | null = null;
  const watchBand = () => {
    bandIO?.disconnect();
    const bottom = Math.max(0, window.innerHeight - 181);
    bandIO = new IntersectionObserver(updateMemo, { rootMargin: `-180px 0px -${bottom}px 0px` });
    secs.forEach((s) => bandIO!.observe(s));
  };
  watchBand();
  new IntersectionObserver(updateMemo).observe(sentinel);
  let rt: number | undefined;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = window.setTimeout(watchBand, 200); });
}

/* ---------- Timeline: today's position in the track ---------- */
document.querySelectorAll<HTMLElement>('[data-timeline]').forEach((el) => {
  const start = new Date(el.dataset.start + 'T00:00:00').getTime();
  const end = new Date(el.dataset.end + 'T00:00:00').getTime();
  const pct = Math.min(1, Math.max(0, (Date.now() - start) / (end - start)));
  el.style.setProperty('--pct', pct.toFixed(4));
  el.classList.toggle('is-late', pct > 0.6);
  const weeks = Number(el.dataset.weeks || 18);
  const week = Math.min(weeks, Math.max(1, Math.floor((Date.now() - start) / 604800000) + 1));
  const label = el.querySelector('[data-today]');
  if (label) label.textContent = `today, week ${week} of ${weeks}`;
});

/* ---------- Videos: play only when motion is welcome ---------- */
document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]').forEach((v) => {
  if (reduceMotion.matches) return;
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) v.play().catch(() => {}); else v.pause();
  });
  io.observe(v);
});

/* ---------- Soual demo ---------- */
const demo = document.querySelector<HTMLElement>('[data-demo]');
if (demo) {
  const $ = <T extends HTMLElement>(s: string) => demo.querySelector<T>(s)!;
  const aBar = $('[data-a-bar]');
  const aDot = $('[data-a-dot]');
  const aText = $('[data-a-text]');
  const bDot = $('[data-b-dot]');
  const bText = $('[data-b-text]');
  const bJob = $('[data-b-job]');
  const stages = Array.from(demo.querySelectorAll<HTMLElement>('[data-stage]'));
  const runBtn = $<HTMLButtonElement>('[data-run]');
  const failBtn = $<HTMLButtonElement>('[data-run-fail]');
  const live = $('[data-live]');

  const INK = 'var(--insert-ink)';
  const FADED = 'var(--ink-faded)';
  const OFF = '#E6E0CF';
  const FAIL = 'var(--fail)';
  const GREY = 'var(--grey-lane)';
  const WAIT_B = 'Instant reply: “got it”. You can keep using the app.';
  const AI_FAILED = 'The AI failed. Error page: you start over.';

  type A = { bar: string; you: string; f?: boolean };
  type B = { st: number; you: string; job: string; f?: boolean; done?: boolean };
  const laneA = (fail: boolean): A[] => [
    { bar: '12%', you: 'Sending the request.' },
    { bar: '38%', you: 'Waiting. The page is stuck while the server waits on the AI.' },
    fail ? { bar: '62%', you: AI_FAILED, f: true } : { bar: '62%', you: 'Still waiting. The server can’t help anyone else meanwhile.' },
    fail ? { bar: '62%', you: AI_FAILED, f: true } : { bar: '86%', you: 'Still waiting.' },
    fail ? { bar: '62%', you: AI_FAILED, f: true } : { bar: '100%', you: 'Questions arrive, after the whole wait.' },
  ];
  const laneB = (fail: boolean): B[] => [
    { st: 0, you: 'Sending the request.', job: 'POST /generate' },
    { st: 1, you: WAIT_B, job: '202 Accepted · the job waits in the Redis queue' },
    fail ? { st: 3, f: true, you: WAIT_B, job: 'AI call failed · the worker retries in 30 s (3 tries max)' }
         : { st: 3, you: WAIT_B, job: 'Celery worker asks the AI model, 10 questions per call' },
    fail ? { st: 3, you: WAIT_B, job: 'retry worked for most · one question type still fails, logged' }
         : { st: 3, you: WAIT_B, job: 'worker saves the questions to PostgreSQL' },
    fail ? { st: 4, done: true, you: 'Most questions are ready; the log says what failed.', job: 'COMPLETED_WITH_ERRORS' }
         : { st: 4, done: true, you: 'Questions are ready. You did not have to wait on the page.', job: 'COMPLETED' },
  ];

  let timer: number | undefined;
  const render = (tick: number, fail: boolean) => {
    const a = laneA(fail)[tick];
    const b = laneB(fail)[tick];
    aBar.style.width = a.bar;
    aBar.style.background = a.f ? FAIL : GREY;
    aDot.style.background = a.f ? FAIL : GREY;
    aText.textContent = a.you;
    stages.forEach((s, i) => {
      let bg = OFF;
      if (b.st === 4 || i === b.st) bg = INK;
      else if (i < b.st) bg = FADED;
      if (b.f && i === 3) bg = FAIL;
      s.style.background = bg;
    });
    bDot.style.background = b.done ? 'var(--ok)' : INK;
    bText.textContent = b.you;
    bJob.textContent = b.job;
    if (tick === 4) live.textContent = `Without a queue: ${a.you} With my pipeline: ${b.you}`;
  };
  const run = (fail: boolean) => {
    if (timer) clearInterval(timer);
    timer = undefined;
    live.textContent = '';
    runBtn.textContent = 'Send it again';
    if (reduceMotion.matches) { render(4, fail); return; }
    let tick = 0;
    render(0, fail);
    timer = window.setInterval(() => {
      tick += 1;
      render(tick, fail);
      if (tick >= 4) { clearInterval(timer); timer = undefined; }
    }, 1700);
  };
  runBtn.addEventListener('click', () => run(false));
  failBtn.addEventListener('click', () => run(true));
}
