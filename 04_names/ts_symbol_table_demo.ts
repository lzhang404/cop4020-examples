// ts_symbol_table_demo.ts
type Info = { kind: "var" | "fun"; type: string };

class Scope {
  table = new Map<string, Info>();
  constructor(public parent: Scope | null) {}

  insert(name: string, info: Info) {
    if (this.table.has(name)) throw new Error("duplicate: " + name);
    this.table.set(name, info);
  }

  lookup(name: string): Info {
    const hit = this.table.get(name);
    if (hit) return hit;
    if (this.parent) return this.parent.lookup(name);
    throw new Error("not found: " + name);
  }
}

const globalScope = new Scope(null);
globalScope.insert("x", { kind: "var", type: "int" });

const fScope = new Scope(globalScope);
fScope.insert("y", { kind: "var", type: "int" });

const inner = new Scope(fScope);
inner.insert("x", { kind: "var", type: "int" }); // shadows

console.log("lookup x in inner:", inner.lookup("x"));
console.log("lookup y in inner:", inner.lookup("y"));
