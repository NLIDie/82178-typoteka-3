import express from 'express';
import {print} from '@utils';

import {mainRouter} from './routes/main-routes';
import {categoriesRouter} from './routes/categories-routes';
import {articlesRouter} from './routes/articles-routes';
import {myRouter} from './routes/my-routes';

const DEFAULT_PORT = 8080;

const app = express();

app.use(`/categories`, categoriesRouter);
app.use(`/articles`, articlesRouter);
app.use(`/my`, myRouter);
app.use(`/`, mainRouter);

app.listen(DEFAULT_PORT, () => {
  print.info(`Сервер express запущен на порту ${DEFAULT_PORT}`);
});
