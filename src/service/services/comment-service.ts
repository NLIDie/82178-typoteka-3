import {createArticle, TArticle} from '@service/entities/article';
import {TComment} from '@service/entities/comment';
import {IEntityService} from './services.types';

export class CommentService implements IEntityService<TComment> {
  private _comments: TComment[];

  constructor(comments: TComment[] = []) {
    this._comments = comments;
  }

  create(article: Omit<TArticle, 'id'>): TArticle {
    const newArticle = createArticle(article);
    this._articles.push(newArticle);

    return newArticle;
  }

  drop(cb: (article: TArticle) => boolean): TArticle | null {
    const article = this._articles.find(cb);

    if (article === undefined) {
      return null;
    }

    this._articles = this._articles.filter(cb);
    return article;
  }

  findOne(cb: (article: TArticle) => boolean): TArticle | null {
    const article = this._articles.find(cb);

    if (article === undefined) {
      return null;
    }

    return article;
  }

  update(cb: (article: TArticle) => TArticle): TArticle[] {
    this._articles = this._articles.map(cb);
    return this._articles;
  }

  findAll(): TArticle[] {
    return this._articles;
  }
}
