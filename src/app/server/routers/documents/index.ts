import { router } from "../../trpc";
import { deleteDocument } from "./deleteDocument";
import { getAllDocuments } from "./getAllDocuments";
import { getDocumentById } from "./getDocumentById";
import { getDocumentsByProject } from "./getDocumentByProjectId";
import { getDocumentsByUserId } from "./getDocumentByUserId";
import { getPdfDocumentsByUserId } from "./getPdfDocumentbyuserId";
import { getTextDocumentByUserId } from "./getTextDocumentByUserId";
import { updateDocument } from "./updateDocument";
import { uploadDocument } from "./uploadDocument";

export const documentsRouter = router({
  getdocuments: getAllDocuments,
  newDocument: uploadDocument,
  getDocumentsByUserId: getDocumentsByUserId,
  editDocument:updateDocument,
  getDocumentById: getDocumentById,
  deleteDocumentById: deleteDocument,
  userPdfDocuments: getPdfDocumentsByUserId,
  userTextDocuments:getTextDocumentByUserId,
  getDocumentByProject:getDocumentsByProject
});
