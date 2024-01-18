import { readdir } from 'node:fs/promises';
import * as path from 'path';

export const readFolder = async sourcePath => {
  try {
    let files = await readdir(sourcePath);

    files = files?.filter(el => path.extname(el).toLowerCase() === '.txt');

    return files;
  } catch (error) {
    console.error('Произошла ошибка чтения директории:', error.message);
  }
};
