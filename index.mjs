import { compress } from "hono/compress";
import { serveStatic } from "@hono/node-server/serve-static";
import { serve } from '@hono/node-server'
import { Hono } from "hono";
import { etag } from "hono/etag";
import { cors } from "hono/cors";
export const app = new Hono();
const applyMiddlewareToPaths = (paths, ...middleware) => {
	for (const path of paths) {
		app.use(path, ...middleware)
	}
}
const middlewares = [compress(),
	etag(),
	cors(),
	async (c, next) => {
		await next();
		if (c.res.status === 200) {
			c.res.headers.set("Cache-Control", "public, max-age=31536000");
		}
	},
	serveStatic({
		root: "dist/client",
	})]
applyMiddlewareToPaths(["/static/*", "/assets/*", "/locales/*", "/site.webmanifest"], ...middlewares);
app.use("*", compress());
import("./dist/server/index.cjs").then((mod) => mod.default).then(
  (module) => {
    app.all("*", async (c) => module.handler.fetch(c.req.raw));
  }
);

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`) // Listening on http://localhost:3000
})