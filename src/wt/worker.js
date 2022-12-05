import { workerData, parentPort } from "node:worker_threads";
import { STATUS_ERROR, STATUS_RESOLVED } from "../fs/fsErrorMessages.mjs";

// n should be received from main thread
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  // This function sends result of nthFibonacci computations to main thread
  const n = parseInt(workerData);

  if (isNaN(n)) {
    parentPort.postMessage({
      status: STATUS_ERROR,
      data: null,
    });
  }

  try {
    parentPort.postMessage({
      status: STATUS_RESOLVED,
      data: nthFibonacci(workerData),
    });
  } catch (e) {
    parentPort.postMessage({
      status: STATUS_ERROR,
      data: null,
    });
  }
};

sendResult();
