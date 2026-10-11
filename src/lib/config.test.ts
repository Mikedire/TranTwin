import { describe, expect, it } from "vitest";
import { buildAuthorizeUrl, buildTokenUrl, config } from "./config";

describe("config", () => {
  it("exposes a B2C tenant authority", () => {
    expect(config.b2c.tenantAuthority).toMatch(
      /^https:\/\/[\w-]+\.b2clogin\.com\/[\w.-]+$/
    );
  });

  it("exposes a clinic API base URL without a trailing slash", () => {
    expect(config.clinic.apiUrl).not.toMatch(/\/$/);
    expect(config.clinic.apiUrl.length).toBeGreaterThan(0);
  });
});

describe("buildAuthorizeUrl", () => {
  it("builds a well-formed OIDC authorization URL", () => {
    const url = buildAuthorizeUrl("login");
    expect(url).toContain("/oauth2/v2.0/authorize?");
    expect(url).toContain("response_type=code");
    expect(url).toContain("client_id=");
    expect(url).toContain("redirect_uri=");
  });

  it("uses a distinct B2C policy per flow", () => {
    const login = buildAuthorizeUrl("login");
    const register = buildAuthorizeUrl("register");
    const reset = buildAuthorizeUrl("passwordReset");

    expect(login).toContain(config.b2c.flows.login);
    expect(register).toContain("B2C_1_TranTwin_Register");
    expect(reset).toContain("B2C_1_TranTwin_PasswordReset");
    expect(new Set([login, register, reset]).size).toBe(3);
  });
});

describe("buildTokenUrl", () => {
  it("points at the policy-specific token endpoint", () => {
    expect(buildTokenUrl("login")).toBe(
      `${config.b2c.tenantAuthority}/${config.b2c.flows.login}/oauth2/v2.0/token`
    );
  });
});