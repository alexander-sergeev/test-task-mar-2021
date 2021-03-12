import { ApolloServer, AuthenticationError } from 'apollo-server-koa';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import {
  GOOGLE_API_TOKENINFO_ENDPOINT,
  GOOGLE_API_USERINFO_ENDPOINT,
} from './constants';
import getGoogleOauthClient from './utils/getGoogleOauthClient';

interface TokenInfo {
  azp: string;
  aud: string;
  sub: string;
  scope: string;
  exp: string;
  expires_in: string;
  email: string;
  email_verified: string;
  access_type: string;
}

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ ctx }) => {
    if (!ctx.req.headers.authorization) {
      throw new AuthenticationError('Authorization header is not provided');
    }
    const token = ctx.req.headers.authorization.replace('Bearer ', '');
    const oAuth2Client = getGoogleOauthClient();
    oAuth2Client.setCredentials({ access_token: token });
    try {
      const {
        data: tokenInfo,
      }: { data: TokenInfo } = await oAuth2Client.request({
        url: GOOGLE_API_TOKENINFO_ENDPOINT,
      });
      if (tokenInfo.aud != process.env.GOOGLE_CLIENT_ID) {
        throw new Error('Token audience mismatch');
      }
      const { data: userData } = await oAuth2Client.request({
        url: GOOGLE_API_USERINFO_ENDPOINT,
      });
      return {
        user: userData,
      };
    } catch (err) {
      if (err.response.status === 400 || err.response.status === 401) {
        throw new AuthenticationError('Provided token is invalid');
      }
      throw err;
    }
  },
});
