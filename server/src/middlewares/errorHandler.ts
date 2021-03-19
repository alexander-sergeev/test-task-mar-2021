import Koa from 'koa';

export const errorHandler: Koa.Middleware = async (
  ctx: Koa.Context,
  next: Koa.Next,
) => {
  try {
    await next();
  } catch (err) {
    ctx.status = ctx.status ?? 500;
    if (ctx.status === 500) {
      ctx.body = { error: 'Internal server error' };
    }
  }
};
