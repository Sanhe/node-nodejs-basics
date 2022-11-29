import { stat, writeFile } from 'node:fs/promises';

const isFileExist = async (filePathUrl) => {
  try {
    const stats = await stat(filePathUrl);

    if (stats) {
      return true;
    }
  } catch (e) {
    // If it's an error of missing file (ENOENT) so the file doesn't exist
    if (e.code === 'ENOENT') {
      return false;
    }

    // Otherwise show the error
    console.error(e.message);
    // Pass the error on
    throw e;
  }
}

const create = async () => {
  const filePath = './files/fresh.txt';
  const data = 'I am fresh and young';

  try {
    const filePathUrl = new URL(filePath, import.meta.url);
    const fileExist = await isFileExist(filePathUrl);

    if (fileExist) {
      throw new Error('FS operation failed');
    }

    const responseUndefinedOnSuccess = await writeFile(filePathUrl, data);

    if (typeof responseUndefinedOnSuccess !== 'undefined') {
      throw new Error('Undefined error');
    }

    console.info('The file has been saved successfully!');
  } catch (e) {
    // Show the error
    console.error(e.message);
    // Pass the error on
    throw e;
  }
};

await create();
