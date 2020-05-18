import config from '../../../config';
import User from '../../../entities/User';
import {
  ReportMovementMutationArgs,
  ReportMovementResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import cleanNullArgs from '../../../utils/cleanNullArgs';
import privateResolver from '../../../utils/privateResolver';
const resolvers: Resolvers = {
  Mutation: {
    ReportMovement: privateResolver(
      async (
        _,
        args: ReportMovementMutationArgs,
        { req, pubSub }
      ): Promise<ReportMovementResponse> => {
        const user: User = req.user;
        const notNull = cleanNullArgs(args);
        try {
          await User.update({ id: user.id }, { ...notNull });
          const updatedUser = await User.findOne({ id: user.id });
          pubSub.publish(config.SUBSCRIPTION_CHANNEL.DRIVERUPDATE, {
            [config.SUBSCRIPTION.DRIVERSSUBSCRIPTION]: updatedUser,
          });
          // DriversSubscription should be the same name for subscription graphql(DriversSubscription)
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
