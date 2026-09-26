const test = require("node:test");
const assert = require("node:assert");
const { timeLeft } = require("./countdown.js");

const DUE = "2026-10-08T06:59:00Z";

test("1 day before the deadline", () => {
  const now = new Date("2026-10-07T06:59:00Z");
  const result = timeLeft(DUE, now);
  assert.deepStrictEqual(result, { days: 1, hours: 0, passed: false });
});

test("1 hour before the deadline", () => {
  const now = new Date("2026-10-08T05:59:00Z");
  const result = timeLeft(DUE, now);
  assert.deepStrictEqual(result, { days: 0, hours: 1, passed: false });
});

test("3 days 5 hours before the deadline", () => {
  const now = new Date("2026-10-05T01:59:00Z");
  const result = timeLeft(DUE, now);
  assert.deepStrictEqual(result, { days: 3, hours: 5, passed: false });
});

test("the exact deadline instant", () => {
  const now = new Date(DUE);
  const result = timeLeft(DUE, now);
  assert.deepStrictEqual(result, { days: 0, hours: 0, passed: true });
});

test("after the deadline", () => {
  const now = new Date("2026-10-08T07:59:00Z");
  const result = timeLeft(DUE, now);
  assert.deepStrictEqual(result, { days: 0, hours: 0, passed: true });
});

test("accepts now as milliseconds instead of a Date", () => {
  const now = new Date("2026-10-07T06:59:00Z").getTime();
  const result = timeLeft(DUE, now);
  assert.deepStrictEqual(result, { days: 1, hours: 0, passed: false });
});

const { DEADLINES, isUrgent } = require("./countdown.js");
const EXPIRES = "2026-11-05T07:59:00Z";

test("credit expiration is Nov 4, 2026 11:59 PM PST (UTC-8)", () => {
  const entry = DEADLINES.find((d) => d.label === "Credit expires");
  assert.ok(entry);
  assert.strictEqual(entry.due, EXPIRES);
});

test("credit expiration countdown from Oct 1", () => {
  const now = new Date("2026-10-01T07:59:00Z");
  assert.deepStrictEqual(timeLeft(EXPIRES, now), { days: 35, hours: 0, passed: false });
});

test("not urgent with exactly 14 days left", () => {
  const now = new Date("2026-10-22T07:59:00Z");
  assert.strictEqual(isUrgent(EXPIRES, now), false);
});

test("urgent with just under 14 days left", () => {
  const now = new Date("2026-10-22T07:59:00.001Z");
  assert.strictEqual(isUrgent(EXPIRES, now), true);
});

test("urgent 1 hour before the deadline", () => {
  const now = new Date("2026-10-08T05:59:00Z");
  assert.strictEqual(isUrgent(DUE, now), true);
});

test("not urgent once the deadline has passed", () => {
  assert.strictEqual(isUrgent(DUE, new Date(DUE)), false);
});

test("isUrgent accepts now as milliseconds", () => {
  const now = new Date("2026-10-01T00:00:00Z").getTime();
  assert.strictEqual(isUrgent(DUE, now), true);
  assert.strictEqual(isUrgent(EXPIRES, now), false);
});
