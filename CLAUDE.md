# claude-cloud-sessions-demo

Run `npm test` before finishing any change. Keep zero dependencies — this
stays a plain HTML/JS demo, no build step, no frameworks.

All countdown logic lives in `countdown.js`; `index.html` only renders what
`countdown.js` returns. Deadlines are stored as UTC instants (ISO strings).
When adding or editing a Pacific-time deadline, convert by hand and account
for DST: PDT is UTC-7, PST is UTC-8.
