import { IResolvers } from 'apollo-server-koa';

const resolvers: IResolvers = {
  Query: {
    user: (_parent: any, _args: any, context: any) => {
      if (!context.user) {
        return null;
      }
      return {
        name: context.user.name,
        picture: context.user.picture,
        locale: context.user.locale,
      };
    },
  },
};

export default resolvers;
