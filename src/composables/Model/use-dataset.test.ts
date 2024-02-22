//@vitest-environment jsdom
import { useCreateDataset, useFetchDataset, useFetchDatasetList, useDeleteDataset, useUpdateDataset, useFetchDatasets } from "./use-dataset";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { setupServer } from 'msw/node'
import { rest } from "msw";
import { withSetup } from "@/utils/test-helper";
import { flushPromises } from "@vue/test-utils";

const server = setupServer(
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
)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe("useFetchDatasets", () => {
  it("should return users", async () => {
    const { data } = withSetup(()=>useFetchDatasetList());
    await flushPromises();
    expect(data.value).toEqual([
      {
        id: "1",
        name: "John Doe",
      },
      {
        id: "2",
        name: "Jane Doe",
      },
    ]);
  });
})

describe("useCreateDataset", () => {
  it("create user", async () => {
    const { mutate, data } = withSetup(()=>useCreateDataset());
    mutate({
      id: "1",
      name: "John Doe",
    });
    await flushPromises();
    expect(data.value).toEqual({
      id: "1",
      name: "John Doe",
    });
  });
})

describe("useFetchDataset", () => {
  it("should return user", async () => {
    const { data } = withSetup(()=>useFetchDataset("1"));
    await flushPromises();
    expect(data.value).toEqual({
      id: "1",
      name: "John Doe",
    });
  });
})
describe("useFetchDatasets", () => {
  it("should return user", async () => {
    const { datasets } = withSetup(()=>useFetchDatasets(["1", "2"]));
    await flushPromises();
    expect(datasets.value).toEqual([{
      id: "1",
      name: "John Doe",
    },{
      id: "2",
      name: "John Doe",
    }]);
  });
})

describe("useUpdateDataset", () => {
  it("should update user", async () => {
    const { mutate, data } = withSetup(()=>useUpdateDataset({
      id: "1",
      name: "John Doe",
    }));
    mutate();
    await flushPromises();
    expect(data.value).toEqual({
      id: "1",
      name: "John Doe",
    });
  });
})

describe("useDeleteDataset", () => {
  it("should remove user", async () => {
    const { mutate, data } = withSetup(()=>useDeleteDataset());
    mutate("1");
    await flushPromises();
    expect(data.value).toEqual({
      id: "1",
      name: "John Doe",
    });
  });
})
