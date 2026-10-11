/**
 * Centralised, environment-driven configuration.
 *
 * `NEXT_PUBLIC_*` values are inlined into the client bundle at build time and
 * are safe to expose. Server-only secrets (`AZURE_B2C_CLIENT_SECRET`,
 * `CLINIC_API_BEARER_TOKEN`) are read directly in `src/app/api/**` route
 * handlers and must never be prefixed with `NEXT_PUBLIC_`.
 */

const tenantName =
  process.env.NEXT_PUBLIC_AZURE_B2C_TENANT_NAME || "dgqatalyst";

export const config = {
  b2c: {
    tenantName,
    tenantAuthority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com`,
    clientId: process.env.NEXT_PUBLIC_AZURE_B2C_CLIENT_ID || "",
    redirectUri:
      process.env.NEXT_PUBLIC_AZURE_B2C_REDIRECT_URI ||
      "http://localhost:3000/auth",
    scope: process.env.NEXT_PUBLIC_AZURE_B2C_SCOPE || "openid profile",
    flows: {
      login:
        process.env.NEXT_PUBLIC_AZURE_B2C_FLOW_LOGIN || "B2C_1_TranTwin_Login",
      register:
        process.env.NEXT_PUBLIC_AZURE_B2C_FLOW_REGISTER ||
        "B2C_1_TranTwin_Register",
      passwordReset:
        process.env.NEXT_PUBLIC_AZURE_B2C_FLOW_PASSWORD_RESET ||
        "B2C_1_TranTwin_PasswordReset",
    },
  },
  clinic: {
    apiUrl: (
      process.env.NEXT_PUBLIC_CLINIC_API_URL ||
      "http://20.127.243.189/v1/clinic"
    ).replace(/\/$/, ""),
  },
} as const;

export type B2cFlow = keyof typeof config.b2c.flows;

/** Builds the Azure AD B2C authorization URL for a given user flow. */
export function buildAuthorizeUrl(flow: B2cFlow): string {
  const params = new URLSearchParams({
    p: config.b2c.flows[flow],
    client_id: config.b2c.clientId,
    nonce: "defaultNonce",
    redirect_uri: config.b2c.redirectUri,
    scope: config.b2c.scope,
    response_type: "code",
    prompt: "login",
  });
  return `${config.b2c.tenantAuthority}/oauth2/v2.0/authorize?${params.toString()}`;
}

/** Builds the token endpoint URL for a given B2C user flow. */
export function buildTokenUrl(flow: B2cFlow): string {
  return `${config.b2c.tenantAuthority}/${config.b2c.flows[flow]}/oauth2/v2.0/token`;
}