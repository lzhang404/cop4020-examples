function* range(n: number) {
  for (let i = 0; i < n; i++) {
    yield i;
  }
}

for (const x of range(4)) {
  console.log(x);
}
