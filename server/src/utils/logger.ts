import pino from 'pino';
import Koa from 'koa';
import { LOG_LEVEL } from '../constants';

const logger: pino.Logger = pino({
  level: LOG_LEVEL,
  prettyPrint: true,
});

export const koaFormatFromCtx = (ctx: Koa.Context): string => {
  return `(${ctx.ip}) "${ctx.method} ${ctx.path}" ${ctx.status}`;
};

export default logger;
