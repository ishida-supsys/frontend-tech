//@vitest-environment jsdom
import { useCreateDashboard, useFetchDashboard, useFetchDashboards, useRemoveDashboard, useUpdateDashboard } from "./use-dashboard";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { setupServer } from 'msw/node'
import { rest } from "msw";
import { withSetup } from "@/utils/test-helper";
import { flushPromises } from "@vue/test-utils";

const server = setupServer(
  rest.get('/dashboards', (req, res, ctx) =>
    res(ctx.json([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ]))),
  rest.post('/dashboards', (req, res, ctx) =>
    res(ctx.json({ id: 1, name: "John Doe" }))),
  rest.put('/dashboards/:dashboardId', (req, res, ctx) =>
    res(ctx.json({ id: Number(req.params.dashboardId), name: "John Doe" }))),
  rest.get('/dashboards/:dashboardId', (req, res, ctx) =>
    res(ctx.json({ id: Number(req.params.dashboardId), name: "John Doe" }))),
  rest.delete('/dashboards/:dashboardId', (req, res, ctx) =>
    res(ctx.json({ id: Number(req.params.dashboardId), name: "John Doe" }))),
)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe("useFetchDashboards", () => {
  it("should return users", async () => {
    const { data } = withSetup(()=>useFetchDashboards());
    await flushPromises();
    expect(data.value).toEqual([
      {
        id: 1,
        name: "John Doe",
      },
      {
        id: 2,
        name: "Jane Doe",
      },
    ]);
  });
})

describe("useCreateDashboard", () => {
  it("create user", async () => {
    const { mutate, data } = withSetup(()=>useCreateDashboard());
    mutate();
    await flushPromises();
    expect(data.value).toEqual({
      id: 1,
      name: "John Doe",
    });
  });
})

describe("useFetchDashboard", () => {
  it("should return user", async () => {
    const { data } = withSetup(()=>useFetchDashboard(1));
    await flushPromises();
    expect(data.value).toEqual({
      id: 1,
      name: "John Doe",
    });
  });
})

describe("useUpdateDashboard", () => {
  it("should update user", async () => {
    const { mutate, data } = withSetup(()=>useUpdateDashboard({
      id: 1,
      name: "John Doe",
      panels: [],
    }));
    mutate();
    await flushPromises();
    expect(data.value).toEqual({
      id: 1,
      name: "John Doe",
    });
  });
})

describe("useRemoveDashboard", () => {
  it("should remove user", async () => {
    const { mutate, data } = withSetup(()=>useRemoveDashboard(1));
    mutate();
    await flushPromises();
    expect(data.value).toEqual({
      id: 1,
      name: "John Doe",
    });
  });
})
