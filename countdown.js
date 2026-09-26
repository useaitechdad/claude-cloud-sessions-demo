// Pure logic for the credit countdown. No DOM access here — index.html only renders.
// Works as a classic browser <script> (attaches to window.Countdown) and via
// Node's require() (module.exports), so double-clicking index.html over file://
// still works with no build step.

var DEADLINES = [
  { label: "Claim your credit", due: "2026-10-08T06:59:00Z" },
  // Nov 4, 2026 11:59 PM PST (UTC-8; DST ends Nov 1).
  { label: "Credit expires", due: "2026-11-05T07:59:00Z" }
];

var URGENT_DAYS = 14;

// dueISO: ISO 8601 UTC instant string.
// now: a Date or a number of milliseconds since epoch.
// Returns { days, hours, passed }. days/hours are the whole days and whole
// remaining hours (after removing those days) left until due; both are 0 once
// passed is true.
function timeLeft(dueISO, now) {
  var nowMs = now instanceof Date ? now.getTime() : now;
  var dueMs = new Date(dueISO).getTime();
  var diffMs = dueMs - nowMs;

  if (diffMs <= 0) {
    return { days: 0, hours: 0, passed: true };
  }

  var totalHours = Math.floor(diffMs / (60 * 60 * 1000));
  var days = Math.floor(totalHours / 24);
  var hours = totalHours - days * 24;

  return { days: days, hours: hours, passed: false };
}

// True when the deadline has not passed but less than URGENT_DAYS remain.
function isUrgent(dueISO, now) {
  var nowMs = now instanceof Date ? now.getTime() : now;
  var diffMs = new Date(dueISO).getTime() - nowMs;
  return diffMs > 0 && diffMs < URGENT_DAYS * 24 * 60 * 60 * 1000;
}

var Countdown = {
  DEADLINES: DEADLINES,
  URGENT_DAYS: URGENT_DAYS,
  timeLeft: timeLeft,
  isUrgent: isUrgent
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = Countdown;
}
if (typeof window !== "undefined") {
  window.Countdown = Countdown;
}
