import { cp } from "node:fs/promises";
import { pathExist, checkResponse } from "./fsCheck.mjs";
import { FS_OPERATION_FAILED, FS_UNDEFINED_ERROR } from "./fsErrorMessages.mjs";

const copy = async () => {
  const srcPath = "./files";
  const destPath = "./files_copy";

  try {
    const srcPathUrl = new URL(srcPath, import.meta.url);
    const destPathUrl = new URL(destPath, import.meta.url);
    const srcExist = await pathExist(srcPathUrl);
    const destExist = await pathExist(destPathUrl);

    if (!srcExist || destExist) {
      if (!srcExist) {
        console.error("Error: Source directory does not exist");
      } else if (destExist) {
        console.error("Error: Destination directory exists");
      }

      throw new Error(FS_OPERATION_FAILED);
    }

    const response = await cp(srcPathUrl, destPathUrl, {
      recursive: true,
    });

    checkResponse(response, "Directory with files have been copied");
  } catch (e) {
    throw e;
  }
};

await copy();
