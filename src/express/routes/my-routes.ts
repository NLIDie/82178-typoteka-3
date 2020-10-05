import {Router as router} from 'express';

export const myRouter = router();

/* мои публикации; */
myRouter.get(`/`, (req, res) => {
  res.render(`pages/my`);
});

/* комментарии к публикациям; */
myRouter.get(`/comments`, (req, res) => {
  res.render(`pages/comments`);
});
