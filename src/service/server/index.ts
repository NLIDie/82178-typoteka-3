import express, {Express} from 'express';

import {createArticlesRouters} from './routes/articles-routes';
import {createCategoriesRoutes} from './routes/categories-routes';

import {HttpCode} from '@service/constants';
import {ArticlesStorage} from '@service/services/articles-storage';

export const createAPIServer = (
    articlesStorage: ArticlesStorage,
    categoriesStorage: categoriesStorage
): Express => {
  const apiServer = express();

  apiServer.use(express.json());

  apiServer.use(`/api/articles`, createArticlesRouters(articlesStorage));
  apiServer.use(`/api/categories`, createCategoriesRoutes(categoriesStorage));
  apiServer.use(`/api/search`, createCategoriesRoutes(articlesStorage));

  apiServer.use((_, res) => {
    res
      .status(HttpCode.NOT_FOUND)
      .send(`Not found`);
  });

  return apiServer;
};

// GET /api/articles — ресурс возвращает список публикаций;
// GET /api/articles/:articleId — возвращает полную информацию о публикации;
// POST /api/articles — создаёт новую публикацию;
// PUT /api/articles/:articleId — редактирует определённую публикацию;
// DELETE /api/articles/:articleId — удаляет определённое публикацию;

// GET /api/articles/:articleId/comments — возвращает список комментариев определённой публикации;
// DELETE /api/articles/:articleId/comments/:commentId — удаляет из определённой публикации комментарий с идентификатором;
// POST /api/articles/:articleId/comments — создаёт новый комментарий;

// GET /api/categories — возвращает список категорий;

// GET /api/search?query= — возвращает результаты поиска. Поиск публикаций выполняется по заголовку. Публикация соответствует поиску в случае наличия хотя бы одного вхождения искомой фразы.
