type Combiner = (a: number, b: number) => number;

const add: Combiner = (a, b) => a + b;
const mul: Combiner = (a, b) => a * b;

function apply(a: number, b: number, op: Combiner): number {
  return op(a, b);
}

console.log(apply(2, 3, add));
console.log(apply(2, 3, mul));
