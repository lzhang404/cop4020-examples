let arr = [1, 2];

function pushAndSum(value: number): number {
  arr.push(value); // side effect
  return arr.reduce((a, b) => a + b, 0);
}

let total = pushAndSum(3) + pushAndSum(4);
console.log("arr =", arr);
console.log("total =", total);
