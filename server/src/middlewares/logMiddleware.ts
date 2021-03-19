import Koa from 'koa';
import logger, { koaFormatFromCtx } from '../utils/logger';

export const logMiddleware: Koa.Middleware = async (
  ctx: Koa.Context,
  next: Koa.Next,
) => {
  try {
    await next();
    logger.info(koaFormatFromCtx(ctx));
  } catch (err) {
    logger.error(err, koaFormatFromCtx(ctx));
    throw err;
  }
};
