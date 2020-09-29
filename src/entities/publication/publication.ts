import {getUniqueID} from "@utils";

export type Publication = {
  id: string;
  title: string;
  createdDate: string;
  announce: string;
  fullText: string;
  category: string[];
}

export const makePublication = (publicationData: Omit<Publication, 'id'>): Publication => ({
  id: getUniqueID(`Publication`),
  ...publicationData
});

export const publication = {
  make: makePublication
};
