import path from 'path';

import {
  print,
  readFileWithContent
} from '@utils';
import {commentGenerator} from '@service/mocks/comments-generator';
import {articlesGenerator} from '@service/mocks/articles-generator';
import {FileSystemStorage} from '@service/services/file-system-storage';
import {TArticle} from '@service/entities/articles';
import { MOCK_FILE_PATH } from '@service/constants';

const ArticleContentFilePath = {
  SENTENCES: path.resolve(__dirname, `../../../data/sentences.txt`),
  TITLES: path.resolve(__dirname, `../../../data/titles.txt`),
  CATEGORIES: path.resolve(__dirname, `../../../data/categories.txt`)
};

const CommentContentFilePath = {
  COMMENT_TEXTS: path.resolve(__dirname, `../../../data/comments.txt`)
};

const MAX_GENERATE_COMMENTS = 50;

enum GenerateCountRestrict {
  MIN = 1,
  MAX = 1000
}

export const commandGenerate = {
  name: `--generate` as const,
  async run(count: string): Promise<void> {
    const articlesCount = Number.parseInt(count, 10)
      ? Number.parseInt(count, 10)
      : GenerateCountRestrict.MIN;

    if (articlesCount > GenerateCountRestrict.MAX) {
      print.error(`Нельзя сгенерировать больше чем ${GenerateCountRestrict.MAX} записей.`);
      return;
    }

    const [
      titles,
      categories,
      sentences,
      commentTexts
    ] = await Promise.all([
      readFileWithContent(ArticleContentFilePath.TITLES),
      readFileWithContent(ArticleContentFilePath.CATEGORIES),
      readFileWithContent(ArticleContentFilePath.SENTENCES),
      readFileWithContent(CommentContentFilePath.COMMENT_TEXTS)
    ]);

    const articles = Array(articlesCount).fill(null).map(() => {
      const comments = Array(MAX_GENERATE_COMMENTS)
        .fill(null)
        .map(() => commentGenerator.create(commentTexts));

      return articlesGenerator.create(titles, categories, sentences, comments);
    });

    const articlesFileSystemStorage = new FileSystemStorage<TArticle>(MOCK_FILE_PATH);
    await articlesFileSystemStorage.save(articles);

    print.success(`Успешно сгенерировано и сохраненно ${articlesCount} записей.`);
  }
};
