import {getUniqueID} from '@utils';
import {TComment} from "./comment";

export interface TArticle {
  readonly id: string;
  readonly title: string;
  readonly createdDate: string;
  readonly announce: string;
  readonly fullText: string;
  readonly category: string[];
  readonly comments: TComment[];
}

export const createArticle = (postData: Omit<TArticle, 'id'>): TArticle => ({
  id: getUniqueID(),
  ...postData
});
