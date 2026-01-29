const fs: (() => number)[] = [];
for (let i = 0; i < 3; i++) {
  fs.push(() => i);
}
console.log(fs[0](), fs[1](), fs[2]());

const fs1: (() => number)[] = [];
for (var i = 0; i < 3; i++) {
  fs1.push(() => i);
}
console.log(fs1[0](), fs1[1](), fs1[2]());