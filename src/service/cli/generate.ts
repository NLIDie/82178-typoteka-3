import {promises as fs} from 'fs';
import path from 'path';
import moment from 'moment';
import {
  shuffle,
  getRandom, print
} from '@utils';
import {
  makePublication,
  Publication
} from '@entities/publication';
import {ExitCode} from '../constants';

const FILE_SENTENCES_PATH = path.join(__dirname, `../../../data/sentences.txt`);
const FILE_TITLES_PATH = path.join(__dirname, `../../../data/titles.txt`);
const FILE_CATEGORIES_PATH = path.join(__dirname, `../../../data/categories.txt`);

const getTitle = (titles: string[]): string => (
  shuffle(titles)[getRandom(0, titles.length - 1)]
);

const getAnnounce = (sentences: string[]): string => (
  sentences
    .slice(0, 5)
    .join(` `)
);

const getFullText = (sentences: string[]): string => (
  sentences
    .slice(0, getRandom(6, sentences.length - 1))
    .join(` `)
);

const getCategory = (categories: string[]): string[] => (
  shuffle(categories)
    .slice(0, getRandom(1, categories.length - 1))
);

const getCreateDate = (): string => {
  const currentDate = moment();

  const rangeDateMax = currentDate.valueOf();
  const rangeDateMin = currentDate.subtract(3, `month`).valueOf();

  const randomDate = getRandom(rangeDateMin, rangeDateMax);

  return moment(randomDate).format(`YYYY-MM-DD HH:mm:ss`);
};

const generatePublication = (
    titles: string[],
    categories: string[],
    sentences: string[],
): Publication => {
  const shuffledSentences = shuffle(sentences);

  return makePublication({
    title: getTitle(titles),
    createdDate: getCreateDate(),
    announce: getAnnounce(shuffledSentences),
    fullText: getFullText(shuffledSentences),
    category: getCategory(categories)
  });
};

const generatePublications = (
    count: number,
    titles: string[],
    categories: string[],
    sentences: string[]
): Publication[] => (
  Array(count)
    .fill(null)
    .map<Publication>(() => generatePublication(titles, categories, sentences))
);

const writeFileWithMocks = async <T>(data: T[]): Promise<void> => {
  const fileName = `mocks.json`;

  try {
    await fs.writeFile(fileName, JSON.stringify(data, undefined, 2), `utf-8`);
    print.success(`Файл ${fileName} успешно создан.`);
  } catch (error) {
    print.error(error);
    process.exit(ExitCode.ERROR);
  }
};

const readFileWithContent = async (filePath: string): Promise<string[]> => {
  try {
    const content = await fs.readFile(filePath, `utf-8`);

    return content.trim().split(`\n`);
  } catch (error) {
    print.error(error);
  }

  return [];
};

enum GenerateCountRestrict {
  MIN = 1,
  MAX = 1000
}

export const commandGenerate = {
  name: `--generate` as const,
  async run(...args: string[]): Promise<void> {
    const count = Number.parseInt(args[0], 10);
    const isValid = !Number.isNaN(count);

    const publicationCount = isValid
      ? count
      : GenerateCountRestrict.MAX;

    if (publicationCount > GenerateCountRestrict.MAX) {
      print.error(`Не больше ${GenerateCountRestrict.MAX} объявлений`);
      return;
    }

    const [
      titles,
      categories,
      sentences
    ] = await Promise.all([
      readFileWithContent(FILE_TITLES_PATH),
      readFileWithContent(FILE_CATEGORIES_PATH),
      readFileWithContent(FILE_SENTENCES_PATH)
    ]);

    const publications = generatePublications(
        count,
        titles,
        categories,
        sentences
    );

    await writeFileWithMocks(publications);
  }
};
