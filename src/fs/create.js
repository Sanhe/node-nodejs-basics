import { writeFile } from "node:fs/promises";
import { pathExist as isFileExist } from "./fsCheck.mjs";
import { FS_OPERATION_FAILED } from "./fsErrorMessages.mjs";

const create = async () => {
  const filePathUrl = new URL("./files/fresh.txt", import.meta.url);
  const fileExist = await isFileExist(filePathUrl);

  if (fileExist) {
    throw new Error(FS_OPERATION_FAILED);
  }

  await writeFile(filePathUrl, "I am fresh and young");
};

await create();
