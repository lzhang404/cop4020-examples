let x = 1;
{
  let x = 2;
  console.log("inner:", x);
}
console.log("outer:", x);
