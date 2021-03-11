import Koa from 'koa';
import getGoogleOauthClient from '../utils/getGoogleOauthClient';

const handler = async (ctx: Koa.Context) => {
  const oAuth2Client = getGoogleOauthClient();
  oAuth2Client.setCredentials(ctx.request.body.tokens);
  const { credentials } = await oAuth2Client.refreshAccessToken();
  ctx.body = { credentials };
};

export default handler;
