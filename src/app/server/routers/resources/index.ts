import { router } from "../../trpc";
import { addResource } from "./addResourceByDocumentId";
import { getResourcesWithDocuments } from "./getResources";



export const resources = router({
 addNewResource:addResource,
addResourceByDocumentId:addResource,
getResourcesWithDocuments: getResourcesWithDocuments
});
