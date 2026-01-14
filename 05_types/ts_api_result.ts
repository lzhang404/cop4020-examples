type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

type User = { id: number; name: string };

function getUser(id: number): ApiResult<User> {
  if (id === 1) return { ok: true, data: { id: 1, name: "Alice" } };
  return { ok: false, error: "not found" };
}

const r = getUser(2);
if (r.ok) console.log(r.data.name);
else console.log("error:", r.error);
