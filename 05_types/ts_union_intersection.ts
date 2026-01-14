type Id = number | string;

function printId(id: Id) {
  if (typeof id === "string") console.log(id.toUpperCase());
  else console.log(id.toFixed(2));
}

type HasId = { id: number };
type HasName = { name: string };
type User = HasId & HasName;

const u: User = { id: 1, name: "Bob" };
printId(u.id);
printId(u.name);
