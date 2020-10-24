import {
  shuffle,
  getRandom
} from '@utils';
import {
  TComment,
  createComment
} from '@service/entities/comments';

class CommentGenerator {
  public create(commentTexts: TComment['text'][]): TComment {
    return createComment({
      text: this.generateText(commentTexts)
    });
  }

  private generateText(commentTexts: TComment['text'][]): TComment['text'] {
    return shuffle(commentTexts)[getRandom(0, commentTexts.length - 1)];
  }
}

export const commentGenerator = new CommentGenerator();
