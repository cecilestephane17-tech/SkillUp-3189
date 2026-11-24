import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer } from "better-auth/plugins";
import { db } from "./database";
export const auth = betterAuth({
  basePath: "/api/auth",
  baseURL: process.env.WEBSITE_URL,
  database: drizzleAdapter(db, { provider: "sqlite" }),
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      phone: { type: "string", required: true },
      role: { type: "string", defaultValue: "learner", input: false },
    },
  },
  trustedOrigins: (request) => {
    const origin = request?.headers.get("origin");
    return origin ? [origin] : [];
  },
  plugins: [bearer()],
  rateLimit: { enabled: true },
});
