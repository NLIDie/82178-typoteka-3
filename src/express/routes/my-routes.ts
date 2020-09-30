import {Router as router} from 'express';

export const myRouter = router();

/* мои публикации; */
myRouter.get(`/`, (req, res) => {
  res.send(`/my`);
});

/* комментарии к публикациям; */
myRouter.get(`/comments`, (req, res) => {
  res.send(`/my/comments`);
});
