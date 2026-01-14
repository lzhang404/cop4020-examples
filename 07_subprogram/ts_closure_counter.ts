function makeCounter(): () => number {
  let count = 0; // captured variable (private state)
  return () => {
    count = count + 1;
    return count;
  };
}

const c = makeCounter();
console.log(c()); // 1
console.log(c()); // 2
console.log(c()); // 3
