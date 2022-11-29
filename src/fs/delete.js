import { rm } from "node:fs/promises";
import { pathExist, checkResponse } from "./fsCheck.mjs";
import { FS_OPERATION_FAILED, FS_UNDEFINED_ERROR } from "./fsErrorMessages.mjs";

const remove = async () => {
  try {
    const fileToRemovePath = new URL(
      "./files/fileToRemove.txt",
      import.meta.url
    );
    const isFileToRemoveExist = await pathExist(fileToRemovePath);

    if (!isFileToRemoveExist) {
      console.error("File for removing does not exist");

      throw new Error(FS_OPERATION_FAILED);
    }

    const response = await rm(fileToRemovePath);

    checkResponse(
      response,
      "The file for removing has been deleted successfully!"
    );
  } catch (e) {
    throw e;
  }
};

await remove();
