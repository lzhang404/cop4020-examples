type Callback<T> = (err: Error | null, value?: T) => void;

function readUser(id: string, cb: Callback<{ id: string; name: string }>): void {
  setTimeout(() => cb(null, { id, name: "Ada" }), 10);
}
function readOrders(userId: string, cb: Callback<string[]>): void {
  setTimeout(() => cb(null, ["A1", "B2"]), 10);
}

// callback style
readUser("u1", (err, user) => {
  if (err || !user) return console.log("callback error", err);
  readOrders(user.id, (err2, orders) => {
    if (err2 || !orders) return console.log("callback error", err2);
    console.log("callback result:", user.name, orders);
  });
});

// promise wrappers + async/await
function readUserP(id: string): Promise<{ id: string; name: string }> {
  return new Promise((resolve, reject) =>
    readUser(id, (e, v) => (e || !v ? reject(e ?? new Error("missing user")) : resolve(v)))
  );
}
function readOrdersP(userId: string): Promise<string[]> {
  return new Promise((resolve, reject) =>
    readOrders(userId, (e, v) => (e || !v ? reject(e ?? new Error("missing orders")) : resolve(v)))
  );
}

async function workflow(): Promise<void> {
  try {
    const user = await readUserP("u1");
    const orders = await readOrdersP(user.id);
    console.log("async/await result:", user.name, orders);
  } catch (e) {
    console.log("async/await error", e);
  }
}

workflow();
