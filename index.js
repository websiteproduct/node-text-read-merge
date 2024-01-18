import { mergeFiles } from './modules/mergeFiles.js';

const app = async () => {
  try {
    await mergeFiles('./files', 'output');
  } catch (error) {
    console.error('При работе функции возникла ошибка:', error.message);
  }
};

app();
