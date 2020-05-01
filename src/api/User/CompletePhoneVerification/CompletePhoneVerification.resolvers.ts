import { Resolvers } from 'src/types/resolvers';
import User from '../../../entities/User';
import Verification from '../../../entities/Verification';
import {
  CompletePhoneVerificationMutationArgs,
  CompletePhoneVerificationResponse,
} from '../../../types/graph';

const resolvers: Resolvers = {
  Mutation: {
    CompletePhoneVerification: async (
      _,
      args: CompletePhoneVerificationMutationArgs
    ): Promise<CompletePhoneVerificationResponse> => {
      const { phoneNumber, key } = args;
      try {
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key,
        });
        if (!verification) {
          return {
            ok: false,
            error: 'Verification key is not valid',
            token: null,
          };
        } else {
          verification.verified = true;
          verification.save();
        }
        const user = await User.findOne({ phoneNumber });
        if (user) {
          user.verifiedPhoneNumber = true;
          user.save();
          return {
            ok: true,
            error: null,
            token: 'Coming soon by phone',
          };
        } else {
          return {
            ok: true,
            error: null,
            token: null,
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
