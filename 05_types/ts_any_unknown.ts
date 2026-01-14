function shoutAny(x: any) {
  // compiles even if x is not string
  return x.toUpperCase();
}

function shoutUnknown(x: unknown) {
  // must narrow first
  if (typeof x === "string") return x.toUpperCase();
  return "not a string";
}

console.log(shoutAny("hi"));
try {
  console.log(shoutAny(123)); // runtime error
} catch (e) {
  console.log("runtime error from any:", (e as Error).message);
}

console.log(shoutUnknown("hi"));
console.log(shoutUnknown(123));
