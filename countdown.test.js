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
