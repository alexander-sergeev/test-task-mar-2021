import { ApolloServer } from 'apollo-server-koa';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import { GOOGLE_API_USERINFO_ENDPOINT } from './constants';
import getGoogleOauthClient from './utils/getGoogleOauthClient';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ ctx }) => {
    if (!ctx.req.headers.authorization) {
      return {};
    }
    const token = ctx.req.headers.authorization.replace('Bearer ', '');
    const oAuth2Client = getGoogleOauthClient();
    oAuth2Client.setCredentials({ access_token: token });
    try {
      const { data } = await oAuth2Client.request({
        url: GOOGLE_API_USERINFO_ENDPOINT,
      });
      return {
        user: data,
      };
    } catch (err) {
      if (err.response.status === 401) {
        return {};
      }
      throw err;
    }
  },
});
