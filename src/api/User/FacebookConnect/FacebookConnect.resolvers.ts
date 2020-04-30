import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse,
} from 'src/types/graph';
import { Resolvers } from 'src/types/resolvers';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
      const { fbId } = args;
      // console.log('fbId', fbId);
      try {
        const existingUser = await User.findOne({ fbId });
        if (existingUser) {
          return {
            ok: true,
            error: null,
            token: 'temporary existing user',
          };
        } else {
          const newUser = await User.create({
            ...args,
            profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`,
          }).save();
          if (newUser) {
            // console.log('newUser');
            return {
              ok: true,
              error: null,
              token: 'temporary new user',
            };
          } else {
            throw Error('not available to create new');
          }
        }
      } catch (error) {
        // console.log('error:', error);
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
