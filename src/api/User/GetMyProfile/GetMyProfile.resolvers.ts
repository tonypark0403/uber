import { Resolvers } from 'src/types/resolvers';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: privateResolver(async (_, __, { req }) => {
      const { user } = req;
      return {
        ok: true,
        user,
      };
    }),
  },
};

export default resolvers;
