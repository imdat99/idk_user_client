import { createMiddleware } from 'hono/factory'
import { IncomingMessage, ServerResponse } from 'node:http';
export type ExpressMiddleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: any) => void
) => void
export const adaptExpressMiddleware = (middleware: ExpressMiddleware) =>
  createMiddleware(async (c, next) => {
    const req = c.env.incoming;
    const res = c.env.outgoing;

    await new Promise<void>((resolve, reject) => {
      middleware(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    await next();
  });