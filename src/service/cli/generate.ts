import {
  publicationGenerator,
  publicationMock
} from '@entities/publication';
import {print} from '@utils';

enum GenerateCountRestrict {
  MIN = 1,
  MAX = 1000
}

export const commandGenerate = {
  name: `--generate` as const,
  async run(count: string): Promise<void> {
    const publicationCount = Number.parseInt(count, 10)
      ? Number.parseInt(count, 10)
      : GenerateCountRestrict.MIN;

    if (publicationCount > GenerateCountRestrict.MAX) {
      print.error(`Не больше ${GenerateCountRestrict.MAX} публикаций`);
      return;
    }

    const publications = await publicationGenerator.make(publicationCount);

    publicationMock.write(publications);
  }
};
