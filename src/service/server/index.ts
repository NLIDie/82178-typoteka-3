import express from 'express';
import {HttpCode} from '@service/constants';
import {makePostsRouter} from './routes/posts-routes';

export const apiServer = express();

apiServer.use(express.json());

apiServer.use(`/posts`, makePostsRouter());

apiServer.use((_, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .send(`Not found`);
});
