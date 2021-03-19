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
    if (!ctx.state.user) {
      throw new Error(
        'No user property in ctx state passed to Apollo context middleware',
      );
    }
    return {
      user: {
        ...ctx.state.user,
      },
    };
  },
});
