import { fork } from "node:child_process";
import { pathExist } from "../fs/pathExist.mjs";
import { FS_OPERATION_FAILED } from "../fs/fsErrorMessages.mjs";

const spawnChildProcess = async (args) => {
  const childFilePath = new URL("./files/script.js", import.meta.url);
  const IsChildFileExist = await pathExist(childFilePath);

  if (!IsChildFileExist) {
    throw new Error(FS_OPERATION_FAILED);
  }

  fork(childFilePath, args, {
    stdio: ["inherit", "inherit", "inherit", "ipc"],
  });
};

spawnChildProcess();
