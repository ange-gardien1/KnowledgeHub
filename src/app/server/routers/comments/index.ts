import { router } from "../../trpc";
import { addComment } from "./addComments";
import { getCommentsByUserId } from "./getByUserId";
import { getCommentsByDocumentId } from "./getCommentById";

export const comments = router({
  addNewComment: addComment,
  getCommentsFromUserID:getCommentsByUserId,
  getCommentFromDocumentId :getCommentsByDocumentId,
});
