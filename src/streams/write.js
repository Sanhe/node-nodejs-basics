import { open } from "node:fs/promises";
import { createInterface } from "node:readline";
import { Buffer } from "node:buffer";
import { stdin as input, stdout as output } from "node:process";

const write = async () => {
  const fileToReadPath = new URL("./files/fileToWrite.txt", import.meta.url);

  const filehandle = await open(fileToReadPath, "a+");
  const writeStream = filehandle.createWriteStream();

  const readline = createInterface({ input, output, terminal: false });

  readline.on("line", async (line) => {
    const data = new Uint8Array(Buffer.from(line + "\n"));
    writeStream.write(data);
  });
};

await write();
