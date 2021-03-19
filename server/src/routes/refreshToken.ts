import Koa from 'koa';
import { createGoogleOauthClient } from '../utils/googleOauth';

const handler = async (ctx: Koa.Context): Promise<void> => {
  const oAuth2Client = createGoogleOauthClient();
  oAuth2Client.setCredentials(ctx.request.body.tokens);
  const { credentials } = await oAuth2Client.refreshAccessToken();
  ctx.body = { credentials };
};

export default handler;
