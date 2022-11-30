import { readdir } from "node:fs/promises";
import { pathExist } from "./fsCheck.mjs";
import { FS_OPERATION_FAILED, FS_UNDEFINED_ERROR } from './fsErrorMessages.mjs'

const list = async () => {
  const srcPathUrl = new URL("./files", import.meta.url);
  const srcExist = await pathExist(srcPathUrl);

  if (!srcExist) {
    throw new Error(FS_OPERATION_FAILED);
  }

  const files = await readdir(srcPathUrl);

  if (!files) {
    throw new Error(FS_UNDEFINED_ERROR);
  }

  files.map((file) => {
    console.info(file);
  });
};

await list();
