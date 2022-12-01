import { open } from "node:fs/promises";
import { pathExist } from "../fs/fsCheck.mjs";
import { FS_OPERATION_FAILED } from "../fs/fsErrorMessages.mjs";

const read = async () => {
  const fileToReadPath = new URL("./files/fileToRead.txt", import.meta.url);
  const IsFileToReadExist = await pathExist(fileToReadPath);

  if (!IsFileToReadExist) {
    throw new Error(FS_OPERATION_FAILED);
  }

  const filehandle = await open(fileToReadPath);
  const readStream = filehandle.createReadStream({ encoding: "utf8" });

  readStream.on("error", function (e) {
    console.error(`error: ${e.message}`);
  });

  // 'readable' may be triggered multiple times as data is buffered in
  readStream.on("readable", () => {
    const sizeOfChunk = 15;
    let chunk;

    // Use a loop to make sure we read all currently available data
    while (null !== (chunk = readStream.read(sizeOfChunk))) {
      console.log(`Read ${chunk.length} bytes of data...`);
      process.stdout.write(chunk);
      console.log("");
    }
  });

  // 'end' will be triggered once when there is no more data available
  readStream.on("end", () => {
    console.log("Reached end of stream.");
  });
};

await read();
