import { Resolvers } from 'src/types/resolvers';
import User from '../../../entities/User';
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse,
} from '../../../types/graph';
const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const { email } = args;
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            ok: false,
            error: 'The user is already signed up',
            token: null,
          };
        } else {
          await User.create({ ...args }).save();
          return {
            ok: true,
            error: null,
            token: 'Coming soon with new user',
          };
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
