import { rename as fsRename } from "node:fs/promises";
import { pathExist, checkResponse } from "./fsCheck.mjs";
import { FS_OPERATION_FAILED } from "./fsErrorMessages.mjs";

const rename = async () => {
  try {
    const wrongFilePath = new URL("./files/wrongFilename1.txt", import.meta.url);
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

    const response = await fsRename(
      wrongFilePath,
      properFilePath
    );

    checkResponse(response, "The wrong file has been renamed successfully!");
  } catch (e) {
    throw e;
  }
};

await rename();
