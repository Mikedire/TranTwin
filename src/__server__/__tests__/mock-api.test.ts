import { describe, expect, it } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { market1ApiEndpoints } from "../__db__/market-1";

describe("mock API layer (market-1)", () => {
  const client = axios.create();
  const mock = new MockAdapter(client);
  market1ApiEndpoints(mock);

  it("returns the main carousel as an array", async () => {
    const res = await client.get("/api/market-1/main-carousel");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
  });

  it("returns flash-deal products typed as flash-deals", async () => {
    const res = await client.get("/api/market-1/flash-deals");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
    for (const product of res.data) {
      expect(product.for?.type).toBe("flash-deals");
    }
  });

  it("returns the service list", async () => {
    const res = await client.get("/api/market-1/get-service-list");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });
});