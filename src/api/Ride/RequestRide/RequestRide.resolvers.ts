import { Resolvers } from 'src/types/resolvers';
import config from '../../../config';
import Ride from '../../../entities/Ride';
import User from '../../../entities/User';
import {
  RequestRideMutationArgs,
  RequestRideResponse,
} from '../../../types/graph';
import privateResolver from '../../../utils/privateResolver';
const resolvers: Resolvers = {
  Mutation: {
    RequestRide: privateResolver(
      async (
        _,
        args: RequestRideMutationArgs,
        { req, pubSub }
      ): Promise<RequestRideResponse> => {
        const user: User = req.user;
        try {
          const ride: Ride = await Ride.create({
            ...args,
            passenger: user,
          }).save();
          pubSub.publish(config.SUBSCRIPTION_CHANNEL.RIDEREQUEST, {
            [config.SUBSCRIPTION.NEARBYRIDESUBSCRIPTION]: ride,
          });
          return {
            ok: true,
            error: null,
            ride,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            ride: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
