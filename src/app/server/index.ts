import { usersRouter } from "./routers";
import { documentsRouter } from "./routers/documents";
import { router } from "./trpc";
export const appRouter = router({
    users: usersRouter,
    documents : documentsRouter
});
export type AppRouter = typeof appRouter;
