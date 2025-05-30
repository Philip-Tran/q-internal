import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql"
  }),

  plugins: [admin()],

  emailAndPassword: {
    enabled: true,
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const { sendMail } = useNodeMailer();
      await sendMail({ text: `Click the link to verify your email: ${url}`, subject: `Hi ${user.name}. Please verify your email`, to: user.email });
    },
    sendOnSignUp: true
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


