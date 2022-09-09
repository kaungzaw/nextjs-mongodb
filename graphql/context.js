import { getSession } from "@auth0/nextjs-auth0";

export async function createContext({ req, res }) {
  const session = getSession(req, res);

  return {
    session,
  };
}
