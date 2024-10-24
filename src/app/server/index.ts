import { usersRouter } from "./routers";
import { comments } from "./routers/comments";
import { documentsRouter } from "./routers/documents";
import { RequestRouter } from "./routers/editResquest";
import { createEditRequest } from "./routers/editResquest/addEditRequest";
import { GuestUsersRouter } from "./routers/guestUsers";
import { notificationRouter } from "./routers/notifications";

import { getNotificationByUserId } from "./routers/notifications/getNotification";
import { getNotificationByStatus } from "./routers/notifications/getNotificationByStatus";
import { projectsRouter } from "./routers/projects";
// import { markNotificationAsRead } from "./routers/notifications/updateNotification";
import { resources } from "./routers/resources";
import { roles } from "./routers/roles";
import { shareprojectsRouter } from "./routers/shareProject";

import { shareProject } from "./routers/shareProject/shareProject";
import { router } from "./trpc";

export const appRouter = router({
  users: usersRouter,
  documents: documentsRouter,
  comments: comments,
  resources: resources,
  editRequest:createEditRequest,
  getNotificationByUserId: getNotificationByUserId,
  notification: notificationRouter,
  request:RequestRouter,
  projects:projectsRouter,
  Roles:roles,
  Projectshare:shareprojectsRouter,
  GuestUsers:GuestUsersRouter
});
export type AppRouter = typeof appRouter;
