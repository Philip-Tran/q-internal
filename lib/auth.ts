import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    github: {
      clientId: "Ov23li7QNVgHfXByLjpU" as string | "Ov23li7QNVgHfXByLjpU",
      clientSecret: "7f9c882a06ecd10b18309bb17279ed7afda16326" as
        | string
        | "7f9c882a06ecd10b18309bb17279ed7afda16326",
    },
  },
});
