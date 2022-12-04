import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { pathExist } from "../fs/pathExist.mjs";
import { FS_OPERATION_FAILED } from "../fs/fsErrorMessages.mjs";

const spawnChildProcess = async (args) => {
  const childFilePath = new URL("./files/script.js", import.meta.url);
  const IsChildFileExist = await pathExist(childFilePath);

  if (!IsChildFileExist) {
    throw new Error(FS_OPERATION_FAILED);
  }

  const preparedArgs = Array.isArray(args) ? args : [args];
  const argsToChild = [childFilePath.pathname, ...preparedArgs];
  const childProcess = spawn(process.argv[0], argsToChild);

  const readline = createInterface({ input, output, terminal: false });

  readline.on("line", (line) => {
    // child process stdin should receive input from master process stdin.
    childProcess.stdin.write(line);
  });

  // child process stdout should send data to master process stdout
  childProcess.stdout.pipe(output);
};

spawnChildProcess();
