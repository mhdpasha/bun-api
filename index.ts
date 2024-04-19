import { API_KEYS } from "./key";

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const apiKey = req.headers.get("Authorization");

    if (apiKey === null || !Object.values(API_KEYS).includes(apiKey)) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!(req.method === "GET" && req.url === "data")) {
      return new Response("Not Found", { status: 404 });
    }

    const data = { message: "Hello, world!", timestamp: Date.now() };
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  },
});

console.log(`Listening on http://localhost:${server.port}`);