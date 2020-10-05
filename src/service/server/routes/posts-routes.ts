import {Router as router} from 'express';
import {print} from '@utils';
import {publicationMock} from '@entities/publication';
import {HttpCode} from '@service/constants';

export const postsRouter = router();

postsRouter.get(`/`, async (req, res) => {
  try {
    res.json(await publicationMock.read());
  } catch (err) {
    print.error(`Не удалось получить посты. Error: ${err}`);
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .json([]);
  }
});
