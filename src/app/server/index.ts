import { usersRouter } from "./routers";
import { comments } from "./routers/comments";
import { documentsRouter } from "./routers/documents";
import { resources } from "./routers/resources";
import { router } from "./trpc";
export const appRouter = router({
  users: usersRouter,
  documents: documentsRouter,
  comments: comments,
  resources: resources,
});
export type AppRouter = typeof appRouter;
