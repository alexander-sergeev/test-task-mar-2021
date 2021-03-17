import Koa from 'koa';
import getGoogleOauthClient from '../utils/getGoogleOauthClient';

const handler = async (ctx: Koa.Context): Promise<void> => {
  const oAuth2Client = getGoogleOauthClient();
  const { tokens } = await oAuth2Client.getToken({
    code: ctx.request.body.code,
  });
  ctx.body = { tokens };
};

export default handler;
