export async function fetchOk(...args: Parameters<typeof fetch>) {
  const resp = await fetch(...args);
  if (resp.status >= 400) {
    const body = await resp.text();
    throw new Error(`failed to fetch (${resp.status}): ${body}`);
  }

  return resp;
}

export async function fetchOkJson<T = any>(
  ...args: Parameters<typeof fetch>
): Promise<T> {
  return fetchOk(...args).then((x) => x.json());
}

export async function sendJson<T = unknown>(
  url: Parameters<typeof fetch>[0],
  options: Omit<RequestInit, "body"> & {
    body: Parameters<typeof JSON.stringify>[0];
  },
): Promise<T> {
  return fetchOkJson<T>(url, {
    ...options,
    method: options.method ?? "POST",
    body: JSON.stringify(options.body),
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
}
