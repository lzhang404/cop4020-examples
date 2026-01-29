// ts_hoist.ts
function demo() {
  console.log(msg); // undefined
  let msg = "hello";
}
demo();