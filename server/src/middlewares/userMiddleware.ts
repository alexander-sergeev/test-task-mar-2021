import Koa from 'koa';
import { verifyIdToken } from '../utils/googleOauth';
import logger from '../utils/logger';
import { ID_TOKEN_HTTP_HEADER_NAME } from '../constants';

/**
 * Koa middleware, injects user info into context state in `user` property.
 * If user is not authenticated, injects `null`.
 * If user provided auth and id token, but validation failed - throws 401 error
 */
export const userMiddleware: Koa.Middleware = async (
  ctx: Koa.Context,
  next: Koa.Next,
) => {
  const authorizationHeader = ctx.req.headers.authorization;
  const idToken = ctx.req.headers[ID_TOKEN_HTTP_HEADER_NAME];
  if (!authorizationHeader) {
    ctx.state.user = null;
    return next();
  }
  if (typeof idToken !== 'string') {
    ctx.status = 401;
    throw new Error('ID Token is not provided');
  }
  try {
    const loginTicket = await verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const tokenPayload = loginTicket.getPayload();
    ctx.state.user = {
      name: tokenPayload?.name,
      picture: tokenPayload?.picture,
      locale: tokenPayload?.locale,
    };
  } catch (err) {
    logger.debug(err);
    ctx.status = 401;
    throw new Error('Provided ID Token is invalid');
  }
  return next();
};
