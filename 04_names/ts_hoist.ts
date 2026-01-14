// ts_hoist.ts
function demo() {
  console.log(msg); // undefined
  var msg = "hello";
}
demo();
