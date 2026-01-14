function log(label: string, value: number): number {
  console.log(label, value);
  return value;
}
let x = 1;
let y = log("first", x++) + log("second", x++);
console.log("after: x =", x, "y =", y);
