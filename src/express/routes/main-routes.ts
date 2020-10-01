import {Router as router} from 'express';

export const mainRouter = router();

/* Главная страница; */
mainRouter.get(`/`, (req, res) => {
  res.render(`pages/main`);
});

/* Cтраница регистрации; */
mainRouter.get(`/register`, (req, res) => {
  res.render(`pages/login`);
});

/* Страница авторизации; */
mainRouter.get(`/login`, (req, res) => {
  res.render(`pages/sign-up`);
});

/* Страница поиска */
mainRouter.get(`/search`, (req, res) => {
  res.render(`pages/search`);
});
