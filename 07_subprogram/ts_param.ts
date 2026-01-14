function bump(n: number): void {
  n = n + 1;
}
function rename(user: { name: string }): void {
  user.name = "new";
}

let x = 10;
bump(x);
console.log("x =", x); // still 10

let u = { name: "old" };
rename(u);
console.log("u.name =", u.name); // "new"
