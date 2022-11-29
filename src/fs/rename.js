import { rename as fsRename } from "node:fs/promises";
import { pathExist } from "./pathExist.mjs";
import { FS_OPERATION_FAILED, FS_UNDEFINED_ERROR } from "./fsErrorMessages.mjs";

const rename = async () => {
  try {
    const wrongFilePath = new URL("./files/wrongFilename.txt", import.meta.url);
    const properFilePath = new URL(
      "./files/properFilename.md",
      import.meta.url
    );
    const isWrongFileExist = await pathExist(wrongFilePath);
    const isProperFileExist = await pathExist(properFilePath);

    if (!isWrongFileExist || isProperFileExist) {
      if (!isWrongFileExist) {
        console.error("The wrong file does not exist");
      } else if (isProperFileExist) {
        console.error("The proper file already exists");
      }

      throw new Error(FS_OPERATION_FAILED);
    }

    const responseUndefinedOnSuccess = await fsRename(
      wrongFilePath,
      properFilePath
    );

    if (typeof responseUndefinedOnSuccess !== "undefined") {
      throw new Error(FS_UNDEFINED_ERROR);
    }

    console.info("The wrong file has been renamed successfully!");
  } catch (e) {
    throw e;
  }
};

await rename();
