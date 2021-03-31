import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import { LogPlugin } from './utils/ApolloLogPlugin';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [LogPlugin],
  context: async ({ ctx }: { ctx: Koa.Context }) => {
    return {
      user: ctx.state.user ? { ...ctx.state.user } : null,
    };
  },
});
