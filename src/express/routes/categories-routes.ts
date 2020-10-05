import {Router as router} from 'express';

export const categoriesRouter = router();

/* Страница категории; */
categoriesRouter.get(`/`, (req, res) => {
  res.render(`pages/all-categories`);
});
