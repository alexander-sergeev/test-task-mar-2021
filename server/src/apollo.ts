import { ApolloServer, AuthenticationError } from 'apollo-server-koa';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import { ID_TOKEN_HTTP_HEADER_NAME } from './constants';
import getGoogleOauthClient from './utils/getGoogleOauthClient';
import { LogPlugin } from './utils/ApolloLogPlugin';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [LogPlugin],
  context: async ({ ctx }) => {
    if (!ctx.req.headers.authorization) {
      throw new AuthenticationError('Authorization header is not provided');
    }
    if (!ctx.req.headers[ID_TOKEN_HTTP_HEADER_NAME]) {
      throw new AuthenticationError('ID Token is not provided');
    }
    const accessToken = ctx.req.headers.authorization.replace('Bearer ', '');
    const idToken = ctx.req.headers[ID_TOKEN_HTTP_HEADER_NAME];
    const oAuth2Client = getGoogleOauthClient();
    try {
      const loginTicket = await oAuth2Client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const tokenPayload = loginTicket.getPayload();
      return {
        user: {
          name: tokenPayload?.name,
          picture: tokenPayload?.picture,
          locale: tokenPayload?.locale,
        },
        accessToken,
      };
    } catch (err) {
      throw new AuthenticationError('Provided ID Token is invalid');
    }
  },
});
