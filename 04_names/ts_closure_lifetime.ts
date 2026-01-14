// ts_closure_lifetime.ts
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const c = makeCounter();
console.log(c()); // 1
console.log(c()); // 2
