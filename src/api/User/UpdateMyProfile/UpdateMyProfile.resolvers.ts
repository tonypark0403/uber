import { Resolvers } from 'src/types/resolvers';
import User from '../../../entities/User';
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse,
} from '../../../types/graph';
import cleanNullArgs from '../../../utils/clearnNullArgs';
import privateResolver from '../../../utils/privateResolver';
const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        // remove all of null values
        const notNull = cleanNullArgs(args);
        try {
          if (args.password !== null) {
            user.password = args.password;
            await user.save();
          }
          console.log('notnull:', notNull);
          await User.update({ id: user.id }, { ...notNull });
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
      }
    ),
  },
};

export default resolvers;
