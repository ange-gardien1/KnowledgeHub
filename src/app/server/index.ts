import { usersRouter } from "./routers";
import { comments } from "./routers/comments";
import { documentsRouter } from "./routers/documents";
import { createEditRequest } from "./routers/editResquest/addEditRequest";
import { getNotificationByUserId } from "./routers/notifications/getNotification";
import { resources } from "./routers/resources";
import { router } from "./trpc";
export const appRouter = router({
  users: usersRouter,
  documents: documentsRouter,
  comments: comments,
  resources: resources,
  editRequest:createEditRequest,
  getNotificationByUserId: getNotificationByUserId
});
export type AppRouter = typeof appRouter;
