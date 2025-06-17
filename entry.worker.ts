import { Hono } from "hono";
import { etag } from "hono/etag";
import { cors } from "hono/cors";
type Bindings = {
  UPSTASH_REDIS_REST_URL: string;
  UPSTASH_REDIS_REST_TOKEN: string;
}

interface RedisVariables {
  validatedData?: any;
}
const app = new Hono<{ Bindings: Bindings, Variables: RedisVariables }>()
const applyMiddlewareToPaths = (paths, ...middleware) => {
	for (const path of paths) {
		app.use(path, ...middleware)
	}
}
const middlewares = [
	etag(),
	cors(),
	async (c, next) => {
		await next();
		if (c.res.status === 200) {
			c.res.headers.set("Cache-Control", "public, max-age=31536000");
		}
	},
	// serveStatic({
	// 	root: "dist/client",
	// })
]
applyMiddlewareToPaths(["/static/*", "/assets/*", "/locales/*", "/site.webmanifest"], ...middlewares);
import("./dist/server/index.cjs").then((mod) => mod.default).then(
  (module) => {
    app.all("*",...middlewares, async (c) => module.handler.fetch(c.req.raw));
  }
);
export default app;