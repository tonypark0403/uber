import { Resolvers } from 'src/types/resolvers';
import Verification from '../../../entities/Verification';
import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse,
} from '../../../types/graph';
import { sendVerificationSMS } from '../../../utils/sendSMS';

const resolvers: Resolvers = {
  Mutation: {
    StartPhoneVerification: async (
      _,
      args: StartPhoneVerificationMutationArgs
    ): Promise<StartPhoneVerificationResponse> => {
      const { phoneNumber } = args;
      try {
        const existingVerfication = await Verification.findOne({
          payload: phoneNumber,
        });
        if (existingVerfication) {
          existingVerfication.remove();
        }
        const newVerification = await Verification.create({
          payload: phoneNumber,
          target: 'PHONE',
        }).save();
        // console.log(newVerification);
        await sendVerificationSMS(newVerification.payload, newVerification.key);
        return {
          ok: true,
          error: null,
        };
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
