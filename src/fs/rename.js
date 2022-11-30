import { rename as fsRename } from "node:fs/promises";
import { pathExist } from "./fsCheck.mjs";
import { FS_OPERATION_FAILED } from "./fsErrorMessages.mjs";

const rename = async () => {
  const wrongFilePath = new URL("./files/wrongFilename1.txt", import.meta.url);
  const properFilePath = new URL("./files/properFilename.md", import.meta.url);
  const isWrongFileExist = await pathExist(wrongFilePath);
  const isProperFileExist = await pathExist(properFilePath);

  if (!isWrongFileExist || isProperFileExist) {
    throw new Error(FS_OPERATION_FAILED);
  }

  await fsRename(wrongFilePath, properFilePath);
};

await rename();
