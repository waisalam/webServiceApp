// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    id?: string;
  }

  interface Session {
    user: {
      id?: string;
      role?: string;
      email?: string | null;
      name?: string | null;
    };
  }
}