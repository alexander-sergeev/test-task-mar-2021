import { Context } from '../apollo';
import { Resolvers, User } from '../graphql-types';

const resolvers: Resolvers = {
  Query: {
    user: (parent, args, context: Context): User | null => {
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
