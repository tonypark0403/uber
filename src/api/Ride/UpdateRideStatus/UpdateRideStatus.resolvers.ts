import { Resolvers } from 'src/types/resolvers';
import config from '../../../config';
import Ride from '../../../entities/Ride';
import User from '../../../entities/User';
import {
  UpdateRideStatusMutationArgs,
  UpdateRideStatusResponse,
} from '../../../types/graph';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Mutation: {
    UpdateRideStatus: privateResolver(
      async (
        _,
        args: UpdateRideStatusMutationArgs,
        { req }
      ): Promise<UpdateRideStatusResponse> => {
        const user: User = req.user;
        // Only driver can update the status
        if (user.isDriving) {
          try {
            let ride: Ride | undefined;
            if (args.status === config.RIDESTATUS.ACCEPTED) {
              ride = await Ride.findOne({
                id: args.rideId,
                status: config.RIDESTATUS.REQUESTING,
              });
              if (ride) {
                ride.driver = user;
                user.isTaken = true;
                user.save();
              }
            } else {
              ride = await Ride.findOne({
                id: args.rideId,
                driver: user,
              });
            }
            if (ride) {
              ride.status = args.status;
              ride.save();
              return {
                ok: true,
                error: null,
              };
            } else {
              return {
                ok: false,
                error: "Can't update ride",
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message,
            };
          }
        } else {
          return {
            ok: false,
            error: 'You are not driving',
          };
        }
      }
    ),
  },
};

export default resolvers;
