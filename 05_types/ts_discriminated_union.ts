type Result =
  | { kind: "ok"; value: number }
  | { kind: "error"; message: string };

function handle(r: Result) {
  if (r.kind === "ok") return r.value.toFixed(2);
  return "ERROR: " + r.message;
}

console.log(handle({ kind: "ok", value: 3.14159 }));
console.log(handle({ kind: "error", message: "bad input" }));
