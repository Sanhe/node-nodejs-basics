import { stat } from 'node:fs/promises'

export async function pathExist (pathUrl) {
  try {
    const stats = await stat(pathUrl)

    if (stats) {
      return true
    }
  }
  catch (e) {
    // If the error is ENOENT (missing file/dir) so the file/dir doesn't exist
    if (e.code === 'ENOENT') {
      return false
    }

    // Pass the error on
    throw e
  }
}

