//@vitest-environment jsdom
import { useDashboardEditor } from "./use-dashboard-editor";
import { describe, expect, it } from "vitest";
import { withSetup } from "@/utils/test-helper";
import { flushPromises } from "@vue/test-utils";

describe("useDashboardEditor", () => {
  it("should return empty dashboard", async () => {
    const { data } = withSetup(()=>useDashboardEditor());
    await flushPromises();
    expect(data.value).toEqual({
      name: "",
      panels: [],
    });
  });
})

