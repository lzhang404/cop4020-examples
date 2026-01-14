// ts_shadow.ts
let total = 0;
function add(values: number[]) {
  for (let i = 0; i < values.length; i++) {
    let total = values[i]; // shadows outer total
  }
}
add([1,2,3]);
console.log(total); // 0
