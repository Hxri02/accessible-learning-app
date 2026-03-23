/* ============================================
   app.js — Main Application Logic
   Author : Hariharan J
   College : Prathyusha Engineering College
   Year   : 2023–2024
   ============================================ */

/* ── State ───────────────────────────────────── */
let mode      = 'audio';    // current mode: 'audio' | 'vibration'
let lessonKey = 'letters';  // current lesson: 'letters' | 'numbers' | 'words'
let idx       = 0;          // current item index
let completed = {};         // e.g. { 'letters_0': true, 'numbers_2': true }
let speaking  = false;      // prevents overlapping TTS calls

/* ── setMode() ───────────────────────────────── */
/**
 * Switches the app between Audio Mode and Vibration Mode.
 * Updates button styles, play button label, and tab colors.
 * @param {string} m - 'audio' or 'vibration'
 */
function setMode(m) {
  mode = m;

  // Update mode button active states
  document.getElementById('btn-audio').className =
    'mode-btn' + (m === 'audio' ? ' active-audio' : '');
  document.getElementById('btn-vibration').className =
    'mode-btn' + (m === 'vibration' ? ' active-vibration' : '');

  // Update play button label and style
  const pb = document.getElementById('btn-play');
  pb.className   = m === 'audio' ? 'btn-play' : 'btn-play-vib';
  pb.textContent = m === 'audio' ? '\u25B6 Play' : '\u25B6 Feel';

  // Update active tab color
  document.querySelectorAll('.tab').forEach(t => {
    if (t.classList.contains('active-t') || t.classList.contains('active-t-vib')) {
      t.className = 'tab ' + (m === 'audio' ? 'active-t' : 'active-t-vib');
    }
  });

  render();
}

/* ── setLesson() ─────────────────────────────── */
/**
 * Switches between lesson categories (Letters / Numbers / Words).
 * Resets index to 0 on each switch.
 * @param {string} key - 'letters' | 'numbers' | 'words'
 */
function setLesson(key) {
  lessonKey = key;
  idx = 0;

  // Reset all tabs then activate selected
  document.querySelectorAll('.tab').forEach(t => t.className = 'tab');
  document.getElementById('tab-' + key).className =
    'tab ' + (mode === 'audio' ? 'active-t' : 'active-t-vib');

  render();
}

/* ── render() ────────────────────────────────── */
/**
 * Updates the entire UI to reflect the current state:
 * - Big letter / number / word display
 * - Hint text below the letter
 * - Lesson label, progress dots, score counters
 * - Vibration dots (shown only in vibration mode)
 * - Status bar message
 */
function render() {
  const lesson = lessons[lessonKey];
  const item   = lesson.items[idx];
  const hint   = lesson.hints[idx];

  // Update big letter and color
  const mc = document.getElementById('main-char');
  mc.textContent = item;
  mc.className   = mode === 'audio' ? 'audio-color' : 'vib-color';

  // Update hint and label
  document.getElementById('word-hint').textContent    = hint;
  document.getElementById('lesson-label').textContent =
    lessonKey.charAt(0).toUpperCase() + lessonKey.slice(1) +
    ' \u2014 ' + (mode === 'audio' ? 'Audio' : 'Vibration') + ' Mode';

  // Update score counters
  document.getElementById('s-current').textContent = idx + 1;
  document.getElementById('s-total').textContent   = lesson.items.length;
  document.getElementById('s-done').textContent    =
    Object.keys(completed).filter(k => k.startsWith(lessonKey + '_')).length;

  // Vibration pattern dots
  const vp = document.getElementById('vib-pattern');
  if (mode === 'vibration') {
    vp.style.display = 'flex';
    const count = Math.min((lesson.vibrations[idx] % 7) + 2, 8);
    vp.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const d = document.createElement('div');
      d.className = 'vib-dot';
      d.id = 'vd' + i;
      vp.appendChild(d);
    }
    setStatus('Press Feel for vibration pattern', '');
  } else {
    vp.style.display = 'none';
    setStatus('Press Play to hear the letter', '');
  }

  // Rebuild progress dots
  const pr = document.getElementById('progress-row');
  pr.innerHTML = '';
  lesson.items.forEach((_, i) => {
    const d  = document.createElement('div');
    const k2 = lessonKey + '_' + i;
    d.className =
      'prog-dot' +
      (completed[k2] ? (mode === 'audio' ? ' done-audio' : ' done-vibration') : '') +
      (i === idx ? ' current' : '');
    d.onclick = () => { idx = i; render(); };
    pr.appendChild(d);
  });
}

/* ── playAction() ────────────────────────────── */
/**
 * Core feature — triggered by the Play / Feel button.
 *
 * AUDIO MODE:
 *   Uses the Web Speech API (SpeechSynthesisUtterance).
 *   First speaks the letter/word, then speaks the hint.
 *   e.g. "A" → "as in Apple"
 *
 * VIBRATION MODE:
 *   Uses the Vibration API (navigator.vibrate).
 *   Each item has a unique pulse count → unique haptic pattern.
 *   Also animates the on-screen dots one by one (200ms interval).
 */
function playAction() {
  const lesson = lessons[lessonKey];
  const item   = lesson.items[idx];
  const hint   = lesson.hints[idx];

  // Mark as completed
  completed[lessonKey + '_' + idx] = true;

  if (mode === 'audio') {
    /* ── Audio Mode: Web Speech API ── */
    if (speaking) return;
    speaking = true;

    setStatus('Speaking: "' + item + '"...', 'go');

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const u1 = new SpeechSynthesisUtterance(item);
      u1.rate  = 0.8;
      u1.pitch = 1.1;
      u1.lang  = 'en-US';

      const u2 = new SpeechSynthesisUtterance(hint);
      u2.rate  = 0.9;
      u2.lang  = 'en-US';
      u2.onend = () => {
        speaking = false;
        setStatus('Done! Press Next to continue.', 'go');
      };

      window.speechSynthesis.speak(u1);
      window.speechSynthesis.speak(u2);
    } else {
      // Fallback for browsers without SpeechSynthesis
      setTimeout(() => {
        speaking = false;
        setStatus('Speech not supported in this browser.', '');
      }, 1200);
    }

  } else {
    /* ── Vibration Mode: Haptic + Dot Animation ── */
    const count = Math.min((lesson.vibrations[idx] % 7) + 2, 8);

    setStatus('Vibration pattern for "' + item + '"', 'vib');

    // Trigger device vibration (works on Android Chrome)
    if (navigator.vibrate) {
      const pat = [];
      for (let i = 0; i < count; i++) {
        pat.push(120);              // ON  duration (ms)
        if (i < count - 1) pat.push(80); // OFF duration (ms)
      }
      navigator.vibrate(pat);
    }

    // Animate dots one by one
    let i = 0;
    const dots = document.querySelectorAll('.vib-dot');
    dots.forEach(d => d.classList.remove('active'));

    const iv = setInterval(() => {
      dots.forEach(d => d.classList.remove('active'));
      if (i < dots.length) {
        dots[i].classList.add('active');
        i++;
      } else {
        clearInterval(iv);
        setStatus('Pattern complete! Press Next.', 'vib');
      }
    }, 200);
  }

  render();
}

/* ── nextItem() ──────────────────────────────── */
/**
 * Moves to the next item in the current lesson.
 * Shows a completion message when all items are done.
 */
function nextItem() {
  const lesson = lessons[lessonKey];
  if (idx < lesson.items.length - 1) {
    idx++;
    render();
  } else {
    setStatus('Lesson complete! Try another category.', 'go');
  }
  stopSpeech();
}

/* ── prevItem() ──────────────────────────────── */
/**
 * Moves to the previous item in the current lesson.
 */
function prevItem() {
  if (idx > 0) {
    idx--;
    render();
  }
  stopSpeech();
}

/* ── Helpers ─────────────────────────────────── */

/**
 * Updates the status bar text and color class.
 * @param {string} msg   - Message to display
 * @param {string} cls   - CSS class: '' | 'go' | 'vib'
 */
function setStatus(msg, cls) {
  const sb = document.getElementById('status-bar');
  sb.textContent = msg;
  sb.className   = 'status-bar' + (cls ? ' ' + cls : '');
}

/**
 * Cancels any ongoing Text-to-Speech.
 */
function stopSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  speaking = false;
}

/* ── Init ────────────────────────────────────── */
render();
