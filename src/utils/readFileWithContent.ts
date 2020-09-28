import {promises as fs} from 'fs';
import {print} from './print';

export const readFileWithContent = async (filePath: string): Promise<string[]> => {
  try {
    const content = await fs.readFile(filePath, `utf-8`);
    return content.trim().split(`\n`);
  } catch (err) {
    print.error(`Не удалось прочитать файл ${filePath} с контентом`);
  }

  return [];
};
