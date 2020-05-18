import User from '../../../entities/User';
import {
  UpdatePasswordMutationArgs,
  UpdatePasswordResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
const resolvers: Resolvers = {
  Mutation: {
    UpdatePassword: async (
      _,
      args: UpdatePasswordMutationArgs
    ): Promise<UpdatePasswordResponse> => {
      const { email, password } = args;
      const user: User | undefined = await User.findOne({ email });
      try {
        if (user) {
          if (!user.verifiedPhoneNumber) {
            return {
              ok: false,
              error: 'Please verify your phone number first!',
            };
          }
          if (password !== null) {
            user.password = password;
            await user.save();
            return {
              ok: true,
              error: null,
            };
          }
          return {
            ok: false,
            error: 'Password cannot be empty',
          };
        } else {
          return {
            ok: false,
            error: 'You are not signed up. Please sign up first!',
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
        };
      }
    },
  },
};

export default resolvers;
