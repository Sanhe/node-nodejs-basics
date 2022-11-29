import { writeFile } from "node:fs/promises";
import { pathExist as isFileExist } from "./pathExist.mjs";

const create = async () => {
  const filePath = "./files/fresh.txt";
  const data = "I am fresh and young";

  try {
    const filePathUrl = new URL(filePath, import.meta.url);
    const fileExist = await isFileExist(filePathUrl);

    if (fileExist) {
      throw new Error("FS operation failed");
    }

    const responseUndefinedOnSuccess = await writeFile(filePathUrl, data);

    if (typeof responseUndefinedOnSuccess !== "undefined") {
      throw new Error("Undefined error");
    }

    console.info("The file has been saved successfully!");
  } catch (e) {
    // Show the error
    console.error(e.message);
    // Pass the error on
    throw e;
  }
};

await create();
