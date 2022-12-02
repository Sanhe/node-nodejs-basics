import { stdout } from "node:process";
import { open } from "node:fs/promises";
import { pathExist } from "../fs/pathExist.mjs";
import { FS_OPERATION_FAILED } from "../fs/fsErrorMessages.mjs";

const { createHash } = await import("node:crypto");

const calculateHash = async () => {
  const fileToReadPath = new URL(
    "./files/fileToCalculateHashFor.txt",
    import.meta.url
  );
  const IsFileToReadExist = await pathExist(fileToReadPath);

  if (!IsFileToReadExist) {
    throw new Error(FS_OPERATION_FAILED);
  }

  const fileHandle = await open(fileToReadPath);
  const inputStream = fileHandle.createReadStream();

  const hash = createHash("sha256");
  inputStream.pipe(hash).setEncoding("hex").pipe(stdout);
};

await calculateHash();
