import {Router as router} from 'express';

export const articlesRouter = router();

/* Cтраница создания новой публикации; */
articlesRouter.get(`/add`, (req, res) => {
  res.render(`pages/new-post`);
});

/* Страница редактирования публикации; */
articlesRouter.get(`/edit/:id`, (req, res) => {
  res.render(`pages/post`);
});

/* Страница с публикациями определённой категории; */
articlesRouter.get(`/category/:id`, (req, res) => {
  res.render(`pages/articles-by-category`);
});

/* Cтраница публикации; */
articlesRouter.get(`/:id`, (req, res) => {
  res.render(`pages/post`);
});
