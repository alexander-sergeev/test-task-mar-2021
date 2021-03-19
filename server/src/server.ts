import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { errorHandler } from './middlewares/errorHandler';
import { logMiddleware } from './middlewares/logMiddleware';
import { router } from './routes';
import logger from './utils/logger';

const app = new Koa();

app.use(errorHandler);
app.use(logMiddleware);

app.use(bodyParser());
app.use(router.routes());

app.listen({ port: process.env.PORT }, () =>
  logger.info(`Server is listening at port ${process.env.PORT}`),
);
