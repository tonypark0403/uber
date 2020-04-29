import User from 'src/entities/User';
import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse,
} from 'src/types/graph';
import { Resolvers } from 'src/types/resolvers';

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
      const { fbId } = args;
      try {
        const existingUser = await User.findOne({ fbId });
        if (existingUser) {
          return {
            ok: true,
            error: null,
            token: 'temporary',
          };
        }
        const newUser = await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`,
        }).save();
        if (newUser) {
          return {
            ok: true,
            error: null,
            token: 'temporary',
          };
        } else {
          throw Error('not available to create new');
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
