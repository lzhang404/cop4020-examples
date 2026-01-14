// ts_loop_capture.ts
function loopVar() {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 0);
  }
}

function loopLet() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log("let:", i), 0);
  }
}

loopVar();
setTimeout(loopLet, 10);
