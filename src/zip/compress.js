import { createGzip } from "node:zlib";
import { pipeline } from "node:stream";
import { createReadStream, createWriteStream } from "node:fs";
import { promisify } from "node:util";
import { pathExist } from "../fs/pathExist.mjs";
import { FS_OPERATION_FAILED } from "../fs/fsErrorMessages.mjs";

const compress = async () => {
  const fileToReadPath = new URL("./files/fileToCompress.txt", import.meta.url);
  const gzippedFilePath = new URL("./files/archive.gz", import.meta.url);
  const IsFileToReadExist = await pathExist(fileToReadPath);

  if (!IsFileToReadExist) {
    throw new Error(FS_OPERATION_FAILED);
  }

  const gzip = createGzip();
  const source = createReadStream(fileToReadPath);
  const destination = createWriteStream(gzippedFilePath);
  const pipe = promisify(pipeline);

  await pipe(source, gzip, destination);
};

await compress();
