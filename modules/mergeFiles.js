import { readdir } from 'node:fs/promises';
import * as path from 'path';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

export const mergeFiles = async (sourcePath, name) => {
  try {
    let files = await readdir(sourcePath);

    files = files?.filter(el => path.extname(el).toLowerCase() === '.txt');

    if (files) {
      try {
        const writeStream = createWriteStream(`./${name}.txt`);

        for (const file of files) {
          const readStream = createReadStream(`${sourcePath}/${file}`, {
            encoding: 'utf-8',
          });

          writeStream.write(`[${file}]\n`);

          await pipeline(readStream, writeStream, {
            end: false,
          });
        }

        writeStream.end();
        console.log('ready');
      } catch (error) {
        console.error(
          'Произошла ошибка при использовании pipeline',
          error.message,
        );
      }
    } else if (files?.length === 0) {
      console.log(`Похоже, что файлов в директории ${sourcePath} нет`);
    }
  } catch (error) {
    console.error('Произошла ошибка чтения директории:', error.message);
  }
};
