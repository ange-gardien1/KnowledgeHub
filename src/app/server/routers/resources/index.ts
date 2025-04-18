import { router } from "../../trpc";
import { createResource } from "./addNewResources";
import { addResource } from "./addResourceByDocumentId";
import { deletereMyResources } from "./deleteResources";
import { getResourcesWithDocuments } from "./getResources";
import { getResourcesByType } from "./getResourcesByType";



export const resources = router({
 addNewResource:addResource,
addResourceByDocumentId:addResource,
getResourcesWithDocuments: getResourcesWithDocuments,
createResource: createResource,
getResourcesByType: getResourcesByType,
deleteMyresources:deletereMyResources
});
