import { eveChannel } from "eve/channels/eve";
import { localDev, placeholderAuth, vercelOidc, type AuthFn } from "eve/channels/auth";


// TEMPORARY testing door: read a tier from a header so we can exercise the
// per-tier playbook locally. We replace this with a real auth policy in 4.3.
const demoTierAuth: AuthFn<Request> = async (request) => {
  const tier = request.headers.get("x-shop-tier");
  if (!tier) return null;
  return {
    attributes: { tier },
    principalType: "user",
    principalId: "demo-customer",
    authenticator: "demo",
  };
};


export default eveChannel({
  auth: [
    demoTierAuth,
    // Lets the eve TUI and your Vercel deployments reach the deployed agent.
    vercelOidc(),
    // Open on localhost for `eve dev` and the REPL; ignored in production.
    localDev(),
    // This placeholder will not allow browser requests in production.
    // Replace it with your app's auth provider, like Auth.js or Clerk,
    // or use none() for a public demo.
    placeholderAuth(),
  ],
});
