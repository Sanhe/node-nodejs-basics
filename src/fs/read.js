import { readFile } from "node:fs/promises";
import { pathExist } from "./fsCheck.mjs";
import { FS_OPERATION_FAILED, FS_UNDEFINED_ERROR } from "./fsErrorMessages.mjs";

const read = async () => {
  try {
    const fileToReadPath = new URL(
      "./files/fileToRead.txt",
      import.meta.url
    );
    const IsFileToReadExist = await pathExist(fileToReadPath);

    if (!IsFileToReadExist) {
      console.error(`The file does not exist`);
      throw new Error(FS_OPERATION_FAILED);
    }

    const contents = await readFile(fileToReadPath, { encoding: 'utf8' });

    if (!contents) {
      throw new Error(FS_UNDEFINED_ERROR);
    }

    console.info(contents);
  } catch (e) {
    throw e;
  }
};

await read();
