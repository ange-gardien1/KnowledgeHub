import { appRouter } from "@/app/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "../context";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: (opts) => createContext(opts),
  });
export { handler as GET, handler as POST };
