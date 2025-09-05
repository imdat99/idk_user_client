import { Hono } from "hono";
// import { compress } from "hono/compress";
import { etag } from "hono/etag";
import { cors } from "hono/cors";
import { serveStatic } from 'hono/bun'
import { compress } from '@hono/bun-compress'

const app = new Hono();

// helper apply middleware
const applyMiddlewareToPaths = (paths: string[], ...middleware: any[]) => {
  for (const path of paths) {
    app.use(path, ...middleware);
  }
};

const middlewares = [
  compress(),
  etag(),
  cors(),
  async (c, next) => {
    await next();
    if (c.res.status === 200) {
      c.res.headers.set("Cache-Control", "public, max-age=31536000");
    }
  },
  serveStatic({ root: "dist/client" }),
];

applyMiddlewareToPaths(
  ["/static/*", "/assets/*", "/locales/*", "/site.webmanifest"],
  ...middlewares
);

app.use("*", compress());

// import server bundle (SSR entry)
import("./dist/server/index.cjs")
  .then((mod) => mod.default)
  .then((module) => {
    app.all("*", async (c) => module.handler.fetch(c.req.raw));
  });

console.log("Listening on http://localhost:3000");
export default { 
  port: 3000, 
  fetch: app.fetch, 
} 
