import { cp } from "node:fs/promises";
import { pathExist } from "./fsCheck.mjs";
import { FS_OPERATION_FAILED } from "./fsErrorMessages.mjs";

const copy = async () => {
  const srcPathUrl = new URL("./files", import.meta.url);
  const destPathUrl = new URL("./files_copy", import.meta.url);
  const srcExist = await pathExist(srcPathUrl);
  const destExist = await pathExist(destPathUrl);

  if (!srcExist || destExist) {
    throw new Error(FS_OPERATION_FAILED);
  }

  await cp(srcPathUrl, destPathUrl, {
    recursive: true,
  });
};

copy();
