import { router } from "../../trpc";
import { deleteDocument } from "./deleteDocument";
import { getAllDocuments } from "./getAllDocuments";
import { getDocumentById } from "./getDocumentById";
import { getDocumentsByUserId } from "./getDocumentByUserId";
import { updateDocument } from "./updateDocument";
import { uploadDocument } from "./uploadDocument";

export const documentsRouter = router({
  getdocuments: getAllDocuments,
  newDocument: uploadDocument,
  getDocumentsByUserId: getDocumentsByUserId,
  editDocument:updateDocument,
  getDocumentById: getDocumentById,
  deleteDocumentById: deleteDocument
});
