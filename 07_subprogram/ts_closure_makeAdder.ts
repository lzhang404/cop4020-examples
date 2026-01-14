function makeAdder(k: number): (x: number) => number {
  return (x: number) => x + k; // captures k
}

const add10 = makeAdder(10);
const add3 = makeAdder(3);

console.log("add10(5) =", add10(5));
console.log("add3(5)  =", add3(5));
