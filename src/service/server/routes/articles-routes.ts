import {
  Router as router,
  IRouter
} from 'express';
import {ArticlesStorage} from '@service/storage/articles-storage';

// 10.2. Форма добавления новой публикации:
// Заголовок;
// Фотография;
// Дата публикации;
// Категория;
// Анонс публикации;
// Полный текст публикации.
// 10.3. Поля «Полный текст публикации» и «Фотография» не обязательны для заполнения;
// 10.4. Правила валидации:
// Заголовок. Обязательное поле. Минимум 30 символов. Максимум 250;
// Фотография. Необязательное поле. Позволяет загружать изображения в формате jpg и png;
// Дата публикации (дата и время). Обязательное поле. По умолчанию текущая дата;
// Категории. Обязательно для выбора одна категория;
// Анонс публикации. Обязательное поле. Минимум 30 символов. Максимум 250;
// Полный текст публикации. Необязательное поле. Максимум 1000 символов.

export const createArticlesRouters = (articlesStorage: ArticlesStorage): IRouter => {
  const articlesRouter = router();

  // GET /api/articles — ресурс возвращает список публикаций;
  articlesRouter.get(`/`, (_, res) => {
    const articles = articlesStorage.get();

    res.json(articles);
  });

  // GET /api/articles/:articleId — возвращает полную информацию о публикации;
  articlesRouter.get(`/:articleId`, (req, res) => {
    const article = articlesStorage.getById(req.params.articleId);

    if (article === undefined) {
      res
        .status(400)
        .send(`Не удалось найти публикацию с таким ${req.params.articleId} индентификатором.`);
    }

    res.json(article);
  });

  // POST /api/articles — создаёт новую публикацию;
  articlesRouter.post(`/`, (req, res) => {

  });

  // PUT /api/articles/:articleId — редактирует определённую публикацию;
  articlesRouter.put(`/:articleId`, (req, res) => {

  });

  // DELETE /api/articles/:articleId — удаляет определённое публикацию;
  articlesRouter.delete(`/:articleId`, (req, res) => {

  });

  return articlesRouter;
};
