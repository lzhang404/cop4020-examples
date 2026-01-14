function computeTotal(items: number[]): number {
  return items.reduce((sum, x) => sum + x, 0);
}
function printReceipt(total: number): void {
  console.log("Total:", total);
}

const total = computeTotal([10, 20, 5]);
printReceipt(total);
