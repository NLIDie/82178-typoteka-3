import {getUniqueID} from "@utils";

export type TComment = {
  readonly id: string;
  readonly text: string;
};

export const createComment = (commentData: Omit<TComment, 'id'>): TComment => ({
  id: getUniqueID(),
  ...commentData
});
