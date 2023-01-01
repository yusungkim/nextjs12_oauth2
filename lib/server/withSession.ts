import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { NextApiHandler } from "next";

export interface UserInfo {
  id: string;               // email/test@example.com | github/31542457 | phone/+81-09012341234
  name: string;
  avatar_url: string | null;
}

interface UserInfoSession extends UserInfo {
  expiry: number;
}

declare module "iron-session" {
  interface IronSessionData {
    user?: UserInfoSession;
    auth?: {
      provider: string;           // github | google | email
      access_token: string | null;
    }
  }
}

const ttl = process.env.SESSION_TTL_IN_SEC
  ? parseInt(process.env.SESSION_TTL_IN_SEC)
  : 60 * 60;

const sessionConfigs = {
  cookieName: process.env.APP_NAME!.split(' ').join('') + "_session",
  password: process.env.SESSION_SECRET!,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
  ttl,
};

export function withApiSession(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionConfigs);
}

export function withSsrSession(handler: any) {
  return withIronSessionSsr(handler, sessionConfigs)
}