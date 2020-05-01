import { Resolvers } from 'src/types/resolvers';

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: async (_, __, { req }) => {
      const { user } = req;
      return {
        ok: true,
        user,
      };
    },
  },
};

export default resolvers;
