import { usersRouter } from "./routers";
import { router } from "./trpc";
export const appRouter = router({
    users: usersRouter
});
export type AppRouter = typeof appRouter;
