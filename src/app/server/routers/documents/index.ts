import { router } from "../../trpc";
import { getAllDocuments } from "./getAllDocuments";
import { getDocumentsByUserId } from "./getDocumentByUserId";
import { uploadDocument } from "./uploadDocument";

export const documentsRouter = router({
  getdocuments: getAllDocuments,
  newDocument: uploadDocument,
  getDocumentsByUserId: getDocumentsByUserId
});
