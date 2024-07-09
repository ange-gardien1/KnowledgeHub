import { auth } from "@/app/auth";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export async function createContext(opts: FetchCreateContextFnOptions) {
  const session = await auth();
  return {
    session,
  };
}
export type context = Awaited<ReturnType<typeof createContext>>;
