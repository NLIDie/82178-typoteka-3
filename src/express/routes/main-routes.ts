import {Router as router} from 'express';

export const mainRouter = router();

/* Главная страница; */
mainRouter.get(`/`, (req, res) => {
  res.send(`/`);
});

/* Cтраница регистрации; */
mainRouter.get(`/register`, (req, res) => {
  res.send(`/register`);
});

/* Страница авторизации; */
mainRouter.get(`/login`, (req, res) => {
  res.send(`/login`);
});

/* Страница поиска */
mainRouter.get(`/search`, (req, res) => {
  res.send(`/search`);
});
