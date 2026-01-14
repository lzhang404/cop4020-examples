// ts_aliasing.ts
const a = { n: 0 };
const b = a;
b.n++;
console.log(a.n, b.n, a === b); // 1 1 true
