// ts_static_scope.ts
let x = "global";
function outer() {
  let x = "outer";
  function inner() {
    console.log(x); // outer
  }
  inner();
}
outer();
