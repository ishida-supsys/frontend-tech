import { Plugin } from "vue";
import { setupWorker, rest } from "msw";

export const MSWPlugin: Plugin = {
  install(app) {
    setupWorker(
      rest.post('/login', (req, res, ctx) => 
        res(ctx.json({ }))),
      rest.get('/dashboards', (req, res, ctx) =>
        res(ctx.json([
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Doe" },
        ]))),
      rest.post('/dashboards', (req, res, ctx) =>
        res(ctx.json({ id: 1, name: "", panels:[] }))),
      rest.put('/dashboards/:dashboardId', (req, res, ctx) =>
        res(ctx.json({ id: Number(req.params.dashboardId), name: "John Doe", panels:[] }))),
      rest.get('/dashboards/:dashboardId', (req, res, ctx) =>
        res(ctx.json({ id: Number(req.params.dashboardId), name: "John Doe", panels:[] }))),
      rest.delete('/dashboards/:dashboardId', (req, res, ctx) =>
        res(ctx.json({ id: Number(req.params.dashboardId), name: "John Doe", panels:[] }))),
      rest.get('/datasets', (req, res, ctx) =>
        res(ctx.json([
          { id: "1", name: "John Doe" },
          { id: "2", name: "Jane Doe" },
        ]))),
      rest.post('/datasets', (req, res, ctx) =>
        res(ctx.json({ id: "1", name: "John Doe" }))),
      rest.put('/datasets/:dashboardId', (req, res, ctx) =>
        res(ctx.json({ id: req.params.dashboardId, name: "John Doe" }))),
      rest.get('/datasets/:dashboardId', (req, res, ctx) =>
        res(ctx.json({ id: req.params.dashboardId, name: "John Doe" }))),
      rest.delete('/datasets/:dashboardId', (req, res, ctx) =>
        res(ctx.json({ id: req.params.dashboardId, name: "John Doe" }))),
    ).start({
      // onUnhandledRequest: 'error',
    });
  }
};
