function label(name: string | undefined) {
  let shown1 = name || "anonymous";
  let shown2 = name ?? "anonymous";
  console.log({ name, shown1, shown2 });
}

label(undefined);
label("");
