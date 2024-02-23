export async function post(url: string, body: object) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response;
}
//add more requests as we go
export async function get(url: string) {
  const response = await fetch(url, {
    method: "GET",
  });
  return response;
}
