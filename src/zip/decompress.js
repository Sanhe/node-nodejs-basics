import { createUnzip } from "node:zlib";
import { pipeline } from "node:stream";
import { createReadStream, createWriteStream } from "node:fs";
import { promisify } from "node:util";
import { pathExist } from "../fs/fsCheck.mjs";
import { FS_OPERATION_FAILED } from "../fs/fsErrorMessages.mjs";

const decompress = async () => {
  const gzippedFilePath = new URL("./files/archive.gz", import.meta.url);
  const fileToUnzipPath = new URL("./files/fileToCompress.txt", import.meta.url);
  const IsFileToReadExist = await pathExist(gzippedFilePath);

  if (!IsFileToReadExist) {
    throw new Error(FS_OPERATION_FAILED);
  }

  const ungzip = createUnzip();
  const source = createReadStream(gzippedFilePath);
  const destination = createWriteStream(fileToUnzipPath);
  const pipe = promisify(pipeline);

  await pipe(source, ungzip, destination);
};

await decompress();