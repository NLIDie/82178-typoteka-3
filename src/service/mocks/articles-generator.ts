import moment from 'moment';
import {
  shuffle,
  getRandom,
} from '@utils';
import {
  TArticle,
  createArticle
} from '@service/entities/articles';
import {TComment} from '@service/entities/comments';

enum CommentsRestriction {
  MIN = 1,
  MAX = 10
}

class ArticlesGenerator {
  public create(
      titles: string[],
      categories: string[],
      sentences: string[],
      comments: TComment[]
  ): TArticle {
    const shuffledSentences = shuffle(sentences);

    return createArticle({
      title: this.generateTitle(titles),
      createdDate: this.generateCreateDate(),
      announce: this.generateAnnounce(shuffledSentences),
      fullText: this.generateFullText(shuffledSentences),
      category: this.generateCategory(categories),
      comments: this.getComments(comments)
    });
  }

  private generateAnnounce(sentences: string[]): string {
    return sentences.slice(0, 5).join(` `);
  }

  private generateTitle(titles: string[]): string {
    return shuffle(titles)[getRandom(0, titles.length - 1)];
  }

  private generateFullText(sentences: string[]): string {
    return sentences.slice(0, getRandom(6, sentences.length - 1)).join(` `);
  }

  private generateCategory(categories: string[]): string[] {
    return shuffle(categories).slice(0, getRandom(1, categories.length - 1));
  }

  private generateCreateDate(): string {
    const currentDate = moment();
    const rangeDateMax = currentDate.valueOf();
    const rangeDateMin = currentDate.subtract(3, `month`).valueOf();
    const randomDate = getRandom(rangeDateMin, rangeDateMax);

    return moment(randomDate).format(`YYYY-MM-DD HH:mm:ss`);
  }

  private getComments(comments: TComment[]): TComment[] {
    return shuffle(comments).slice(
        CommentsRestriction.MIN,
        getRandom(CommentsRestriction.MIN + 1, CommentsRestriction.MAX)
    );
  }
}

export const articlesGenerator = new ArticlesGenerator();
