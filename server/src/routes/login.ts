import Koa from 'koa';
import getGoogleOauthClient from '../utils/getGoogleOauthClient';

const handler = async (ctx: Koa.Context) => {
  const oAuth2Client = getGoogleOauthClient();
  const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'profile email openid',
    prompt: 'consent',
  });
  ctx.redirect(url);
};

export default handler;
