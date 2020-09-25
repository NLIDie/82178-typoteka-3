import {promises as fs} from 'fs';
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

enum GenerateCountRestrict {
  MIN = 1,
  MAX = 1000
}

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`
];

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

export const cliCommandGenerate = {
  name: `--generate`,
  async run(count: number = GenerateCountRestrict.MIN): Promise<void> {
    if (count > GenerateCountRestrict.MAX) {
      print.error(`Не больше ${GenerateCountRestrict.MAX} объявлений`);
      return;
    }

    const publications = generatePublications(
        count,
        TITLES,
        CATEGORIES,
        SENTENCES
    );

    await writeFileWithMocks(publications);
  }
};
