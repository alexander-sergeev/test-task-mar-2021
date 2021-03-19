import Koa from 'koa';
import { generateAuthUrl } from '../utils/googleOauth';

const handler = async (ctx: Koa.Context): Promise<void> => {
  const url = generateAuthUrl({
    access_type: 'offline',
    scope: 'profile email openid',
    prompt: 'consent',
  });
  ctx.redirect(url);
};

export default handler;
