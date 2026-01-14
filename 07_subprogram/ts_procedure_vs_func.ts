function logUserLogin(userId: string): void {
  console.log("login", userId); // procedure-like: side effect, no meaningful return
}

function computeDiscount(price: number, rate: number): number {
  return price * (1 - rate); // function-like: computes a value
}

// demo calls
logUserLogin("u123");

const discounted = computeDiscount(100, 0.2);
console.log("discounted =", discounted);
