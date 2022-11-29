import { readdir } from "node:fs/promises";
import { pathExist } from "./fsCheck.mjs";
import { FS_OPERATION_FAILED } from "./fsErrorMessages.mjs";

const list = async () => {
  const srcPath = "./files";

  try {
    const srcPathUrl = new URL(srcPath, import.meta.url);
    const srcExist = await pathExist(srcPathUrl);

    if (!srcExist) {
      console.error(`Folder "${srcPath}" does not exist`);
      throw new Error(FS_OPERATION_FAILED);
    }

    const files = await readdir(srcPathUrl);
    files.map((file) => {
      console.info(file);
    });
  } catch (e) {
    throw e;
  }
};

await list();