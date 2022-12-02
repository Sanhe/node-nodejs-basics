import { Worker } from "node:worker_threads";
import { cpus } from "node:os";
import { STATUS_ERROR } from "../fs/fsErrorMessages.mjs";

const performCalculations = async () => {
  const workerPath = new URL("./worker.js", import.meta.url);
  let fibonacciN = 10;
  const error = {
    status: STATUS_ERROR,
    data: null,
  };

  const workerPromise = () =>
    new Promise((resolve, reject) => {
      const worker = new Worker(workerPath, {
        workerData: fibonacciN,
      });

      worker.on("message", resolve);
      worker.on("error", reject);

      fibonacciN++;
    });
  const workersPromises = cpus().map(workerPromise);
  const results = await Promise.allSettled(workersPromises);

  results.map((result) => {
    if (result.value) {
      console.info(result.value);
    } else {
      console.error(error);
    }
  });
};

await performCalculations();
