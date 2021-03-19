import Koa from 'koa';
import { getToken } from '../utils/googleOauth';

const handler = async (ctx: Koa.Context): Promise<void> => {
  const { tokens } = await getToken({
    code: ctx.request.body.code,
  });
  ctx.body = { tokens };
};

export default handler;
