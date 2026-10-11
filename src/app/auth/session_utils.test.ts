import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  AuthSession,
  destroySession,
  getSession,
  storeSession,
} from "./session_utils";

class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length() {
    return this.store.size;
  }
  clear() {
    this.store.clear();
  }
  getItem(key: string) {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
  key(index: number) {
    return Array.from(this.store.keys())[index] ?? null;
  }
  removeItem(key: string) {
    this.store.delete(key);
  }
  setItem(key: string, value: string) {
    this.store.set(key, String(value));
  }
}

const validSession: AuthSession = {
  exp: 1735689600,
  nbf: 1735686000,
  ver: "1.0",
  iss: "https://dgqatalyst.b2clogin.com/tenant/v2.0/",
  sub: "abc",
  aud: "client-id",
  nonce: "defaultNonce",
  iat: 1735686000,
  auth_time: 1735686000,
  idp: "local",
  name: "Test User",
  given_name: "Test",
  family_name: "User",
  emails: ["test@example.com"],
  tfp: "B2C_1_TranTwin_Login",
};

beforeEach(() => {
  vi.stubGlobal("localStorage", new MemoryStorage());
});

describe("session_utils", () => {
  it("round-trips a stored session", () => {
    storeSession(validSession);
    expect(getSession()).toEqual(validSession);
  });

  it("returns null when nothing is stored", () => {
    expect(getSession()).toBeNull();
  });

  it("returns null instead of throwing on malformed JSON", () => {
    localStorage.setItem("session", "{not-valid-json");
    expect(() => getSession()).not.toThrow();
    expect(getSession()).toBeNull();
  });

  it("clears the session on sign-out", () => {
    storeSession(validSession);
    destroySession();
    expect(getSession()).toBeNull();
  });
});