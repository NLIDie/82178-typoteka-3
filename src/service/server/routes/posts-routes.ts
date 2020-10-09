import {Router as router, IRouter} from 'express';
import {print} from '@utils';
import {publicationMock} from '@entities/publication';

export const makePostsRouter = (): IRouter => {
  const postsRouter = router();

  postsRouter.get(`/`, async (req, res) => {
    try {
      res.json(await publicationMock.read());
    } catch (err) {
      print.error(`Не удалось получить посты. Error: ${err}`);
      res.json([]);
    }
  });

  return postsRouter;
};
