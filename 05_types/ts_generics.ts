function first<T>(items: T[]): T | undefined {
  return items[0];
}

interface Box<T> { value: T; }

const n = first([1, 2, 3]);        // number | undefined
const s = first(["a", "b", "c"]);  // string | undefined

const intBox: Box<number> = { value: 42 };
const strBox: Box<string> = { value: "hello" };

console.log(n, s, intBox, strBox);
