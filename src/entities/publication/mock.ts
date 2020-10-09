import path from 'path';
import {promises as fs} from 'fs';

import {print} from '@utils';
import {Publication} from './publication';

const MOCK_FILE_NAME = path.join(__dirname, `../../../mocks.json`);

const writeMockFile = async (publications: Publication[]): Promise<void> => {
  const content = JSON.stringify(publications, undefined, 2);

  try {
    await fs.writeFile(MOCK_FILE_NAME, content, `utf-8`);
  } catch (err) {
    print.error(`Не удалось записать публикации в mock файл: ${err}`);
  }
};

const readMockFile = async (): Promise<string> => {
  let content = `[]`;

  try {
    content = await fs.readFile(MOCK_FILE_NAME, `utf-8`);
  } catch (err) {
    print.error(`Не удалось прочитать файл "${MOCK_FILE_NAME}"`);
  }

  return content;
};

const parseContent = (content: string): Publication[] => {
  let publications: Publication[] = [];

  try {
    publications = JSON.parse(content);
  } catch (err) {
    print.error(`Не удалось преобразовать данные из mock файла в массив публикаций. ${err}`);
  }

  return publications;
};

const getMockPublications = async (): Promise<Publication[]> => {
  const content = await readMockFile();
  const publications = parseContent(content);

  return publications;
};

export const publicationMock = {
  write: writeMockFile,
  read: getMockPublications
};
