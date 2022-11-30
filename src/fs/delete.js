import { rm } from "node:fs/promises";
import { pathExist } from "./fsCheck.mjs";
import { FS_OPERATION_FAILED } from "./fsErrorMessages.mjs";

const remove = async () => {
    const fileToRemovePath = new URL(
      "./files/fileToRemove1.txt",
      import.meta.url
    );
    const isFileToRemoveExist = await pathExist(fileToRemovePath);

    if (!isFileToRemoveExist) {
      throw new Error(FS_OPERATION_FAILED);
    }

    await rm(fileToRemovePath);
};

await remove();
