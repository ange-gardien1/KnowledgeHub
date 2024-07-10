import { router } from "../../trpc";
import { getAllDocuments } from "./getAllDocuments";
import { uploadDocument } from "./uploadDocument";

export const documentsRouter = router({
  getdocuments: getAllDocuments,
  newDocument: uploadDocument,
});
