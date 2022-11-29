import { writeFile } from "node:fs/promises";
import { pathExist as isFileExist } from "./pathExist.mjs";
import { FS_OPERATION_FAILED, FS_UNDEFINED_ERROR } from "./fsErrorMessages.mjs";

const create = async () => {
  const filePath = "./files/fresh.txt";
  const data = "I am fresh and young";

  try {
    const filePathUrl = new URL(filePath, import.meta.url);
    const fileExist = await isFileExist(filePathUrl);

    if (fileExist) {
      throw new Error(FS_OPERATION_FAILED);
    }

    const responseUndefinedOnSuccess = await writeFile(filePathUrl, data);

    if (typeof responseUndefinedOnSuccess !== "undefined") {
      throw new Error(FS_UNDEFINED_ERROR);
    }

    console.info("The file has been saved successfully!");
  } catch (e) {
    // Pass the error on
    throw e;
  }
};

await create();
