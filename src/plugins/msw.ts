import { Plugin } from "vue";
import { setupWorker, rest } from "msw";

export const MSWPlugin: Plugin = {
  install(app) {
    let userId = 0; 
    setupWorker(
      rest.post('/login', (req, res, ctx) => 
        res(ctx.json({ }))),
      rest.get('/users', (req, res, ctx) =>
        res(ctx.json(Array.from({ length:userId }).map((_, i) => ({ id: i + 1 }))))),
      rest.post('/users', (req, res, ctx) =>
        res(ctx.json({ id: ++userId }))),
      rest.put('/users/:userId', (req, res, ctx) =>
        res(ctx.json({ id: req.params.userId }))),
      rest.get('/users/:userId', (req, res, ctx) =>
        res(ctx.json({ id: req.params.userId }))),
      rest.delete('/users/:userId', (req, res, ctx) =>
        res(ctx.json({ id: req.params.userId }))),
    ).start({
      onUnhandledRequest: 'error',
    });
  }
};
