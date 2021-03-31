import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import { LogPlugin } from './utils/ApolloLogPlugin';

export interface Context {
  user?: {
    name: string;
    picture: string;
    locale: string;
  };
}

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [LogPlugin],
  context: ({ ctx }: { ctx: Koa.Context }): Context => {
    return {
      user: ctx.state.user ? { ...ctx.state.user } : null,
    };
  },
});
