console.log("=== var version (bug) ===");
const callbacksVar: Array<() => void> = [];

for (var i = 0; i < 3; i++) {
  callbacksVar.push(() => console.log("var i =", i));
}

callbacksVar[0]();
callbacksVar[1]();
callbacksVar[2]();

console.log("=== let version (fixed) ===");
const callbacksLet: Array<() => void> = [];

for (let j = 0; j < 3; j++) {
  callbacksLet.push(() => console.log("let j =", j));
}

callbacksLet[0]();
callbacksLet[1]();
callbacksLet[2]();
