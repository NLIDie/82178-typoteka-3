import express from 'express';
import {HttpCode} from '@service/constants';
import {postsRouter} from './routes/posts-routes';

export const apiServer = express();

apiServer.use(express.json());

apiServer.use(`/posts`, postsRouter);

apiServer.use((_, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .send(`Not found`);
});
