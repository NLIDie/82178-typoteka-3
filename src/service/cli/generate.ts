import {promises as fs} from 'fs';
import {
  v1 as uuidv1,
  v5 as uuidv5
} from 'uuid';
import lodash from 'lodash';
import moment from 'moment';

import {ExitCode} from '../constants';

enum PublicationCategory {
  WOODS = `Деревья`,
  FOR_LIVE = `За жизнь`,
  NO_FRAME = `Без рамки`,
  OTHER = `Разное`,
  IT = `IT`,
  MUSIC = `Музыка`,
  MOVIE = `Кино`,
  PROGRAMMING = `Программирование`,
  HARDWARE = `Железо`
}

enum GenerateCountRestrict {
  MIN = 1,
  MAX = 1000
}

type Publication = {
  id: string;
  title: string;
  createdDate: string;
  announce: string;
  fullText: string;
  category: PublicationCategory[];
}

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`
];

const makePublication = (publicationData: Omit<Publication, 'id'>): Publication => ({
  id: uuidv5(`Publication`, uuidv1()),
  ...publicationData
});

const getTitle = (): string => lodash.shuffle(TITLES)[lodash.random(0, TITLES.length - 1)];

const getCreateDate = (): string => {
  const currentDate = moment();

  const rangeDateMax = currentDate.valueOf();
  const rangeDateMin = currentDate.subtract(3, `month`).valueOf();

  const randomDate = lodash.random(rangeDateMin, rangeDateMax);

  return moment(randomDate).format(`YYYY-MM-DD HH:mm:ss`);
};

const getAnnounce = (): string => (
  lodash
    .shuffle(SENTENCES)
    .slice(0, 5)
    .join(` `)
);

const getFullText = (): string => (
  lodash
    .shuffle(SENTENCES)
    .slice(0, SENTENCES.length - 1)
    .join(` `)
);

const getCategory = (): PublicationCategory[] => {
  const categories = Object.values(PublicationCategory);

  return lodash
    .shuffle(categories)
    .slice(0, lodash.random(1, categories.length - 1));
};

const generatePublication = (): Publication => makePublication({
  title: getTitle(),
  createdDate: getCreateDate(),
  announce: getAnnounce(),
  fullText: getFullText(),
  category: getCategory()
});

const generatePublications = (count: number): Publication[] => (
  Array(count)
    .fill(null)
    .map<Publication>(generatePublication)
);

const writeFileWithMocks = async <T>(data: T[]): Promise<void> => {
  const fileName = `mocks.json`;

  try {
    await fs.writeFile(fileName, JSON.stringify(data, undefined, 2), `utf-8`);
  } catch (error) {
    console.error(error);
    process.exit(ExitCode.ERROR);
  }

  console.info(`Файл ${fileName} успешно создан.`);
};

export const cliCommandGenerate = {
  name: `--generate`,
  async run(count: number): Promise<void> {
    const publicationCount = Number.isInteger(count) ? count : GenerateCountRestrict.MIN;

    if (publicationCount > GenerateCountRestrict.MAX) {
      console.info(`Не больше ${GenerateCountRestrict.MAX} объявлений`);
      return;
    }

    const publications = generatePublications(publicationCount);

    await writeFileWithMocks(publications);
  }
};
