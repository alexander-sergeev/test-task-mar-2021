import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { router } from './routes';
import logger, { koaFormatFromCtx } from './utils/logger';

const app = new Koa();

app.use(async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    await next();
    logger.info(koaFormatFromCtx(ctx));
  } catch (err) {
    ctx.status = ctx.status ?? 500;
    logger.error(err, koaFormatFromCtx(ctx));
  }
});

app.use(bodyParser());
app.use(router.routes());

app.listen({ port: process.env.PORT }, () =>
  logger.info(`Server is listening at port ${process.env.PORT}`),
);
