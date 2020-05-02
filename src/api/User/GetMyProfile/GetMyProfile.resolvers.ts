import { GetMyProfileResponse } from 'src/types/graph';
import { Resolvers } from 'src/types/resolvers';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: privateResolver(
      async (_, __, { req }): Promise<GetMyProfileResponse> => {
        const { user } = req;
        return {
          ok: true,
          user,
          error: null,
        };
      }
    ),
  },
};

export default resolvers;
