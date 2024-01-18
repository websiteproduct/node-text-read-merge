import { createReadStream, createWriteStream } from 'node:fs';
import { readFolder } from './modules/reader.js';
import { pipeline } from 'node:stream/promises';

const filesDir = './files';

const app = async () => {
  const files = await readFolder(filesDir);

  if (files) {
    try {
      const writeStream = createWriteStream('./write.txt');

      for (const file of files) {
        const readStream = createReadStream(`${filesDir}/${file}`, {
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
    console.log(`Похоже, что файлов в директории ${filesDir} нет`);
  }
};

app();
