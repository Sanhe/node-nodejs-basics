import { stat } from 'node:fs/promises';

export async function pathExist (pathUrl) {
  try {
    const stats = await stat(pathUrl);

    if (stats) {
      return true;
    }
  } catch (e) {
    // If it's an error of missing file/dir (ENOENT) so the file/dir doesn't exist
    if (e.code === 'ENOENT') {
      return false;
    }

    // Otherwise show the error
    console.error(e.message);
    // Pass the error on
    throw e;
  }
}
