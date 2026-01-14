interface Point { x: number; y: number; }
interface Pixel { x: number; y: number; }

const p: Point = { x: 1, y: 2 };
const px: Pixel = p; // ok in TypeScript (structural)
console.log(px);
