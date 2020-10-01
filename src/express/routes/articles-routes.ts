import {Router as router} from 'express';

export const articlesRouter = router();

/* Cтраница создания новой публикации; */
articlesRouter.get(`/add`, (req, res) => {
  res.send(`/articles/add`);
});

/* Страница редактирования публикации; */
articlesRouter.get(`/edit/:id`, (req, res) => {
  res.send(`/articles/edit/:id`);
});

/* Страница с публикациями определённой категории; */
articlesRouter.get(`/category/:id`, (req, res) => {
  res.send(`/articles/category/:id`);
});

/* Cтраница публикации; */
articlesRouter.get(`/:id`, (req, res) => {
  res.send(`/articles/:id`);
});
