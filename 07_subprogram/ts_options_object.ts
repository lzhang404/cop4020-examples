type FetchOptions = { timeoutMs?: number; retries?: number; cache?: boolean };

function fetchWithOptions(url: string, options: FetchOptions = {}): void {
  const timeoutMs = options.timeoutMs ?? 2000;
  const retries = options.retries ?? 2;
  const cache = options.cache ?? true;
  console.log({ url, timeoutMs, retries, cache });
}

fetchWithOptions("/api/users");
fetchWithOptions("/api/users", { retries: 5, cache: false });
fetchWithOptions("/api/users", { timeoutMs: 5000 });
