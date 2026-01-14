type User = { name: string } | null;

function greet(u: User) {
  if (u !== null && u.name.length > 0) {
    console.log("hello", u.name);
  } else {
    console.log("no user");
  }
}

greet(null);
greet({ name: "" });
greet({ name: "Ana" });
