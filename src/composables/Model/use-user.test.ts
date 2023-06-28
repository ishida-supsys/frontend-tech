import { useCreateUser, useFetchUser, useFetchUsers, useRemoveUser, useUpdateUser } from "./use-user";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { setupServer } from 'msw/node'
import { rest } from "msw";
import { withSetup } from "@/utils/test-helper";
import { flushPromises } from "@vue/test-utils";

const server = setupServer(
  rest.get('/users', (req, res, ctx) =>
    res(ctx.json([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ]))),
  rest.post('/users', (req, res, ctx) =>
    res(ctx.json({ id: 1, name: "John Doe" }))),
  rest.put('/users/:userId', (req, res, ctx) =>
    res(ctx.json({ id: Number(req.params.userId) }))),
  rest.get('/users/:userId', (req, res, ctx) =>
    res(ctx.json({ id: Number(req.params.userId) }))),
  rest.delete('/users/:userId', (req, res, ctx) =>
    res(ctx.json({ id: Number(req.params.userId) }))),
)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

//@vitest-environment jsdom
describe("useFetchUsers", () => {
  it("should return users", async () => {
    const { data } = withSetup(()=>useFetchUsers());
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

describe("useCreateUser", () => {
  it("create user", async () => {
    const { mutate, data } = withSetup(()=>useCreateUser());
    mutate();
    await flushPromises();
    expect(data.value).toEqual({
      id: 1,
      name: "John Doe",
    });
  });
})

describe("useFetchUser", () => {
  it("should return user", async () => {
    const { data } = withSetup(()=>useFetchUser(1));
    await flushPromises();
    expect(data.value).toEqual({
      id: 1,
    });
  });
})

describe("useUpdateUser", () => {
  it("should update user", async () => {
    const { mutate, data } = withSetup(()=>useUpdateUser(1));
    mutate();
    await flushPromises();
    expect(data.value).toEqual({
      id: 1,
    });
  });
})

describe("useRemoveUser", () => {
  it("should remove user", async () => {
    const { mutate, data } = withSetup(()=>useRemoveUser(1));
    mutate();
    await flushPromises();
    expect(data.value).toEqual({
      id: 1,
    });
  });
})
