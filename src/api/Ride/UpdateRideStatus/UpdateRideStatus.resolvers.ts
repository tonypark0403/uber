import config from '../../../config';
import Chat from '../../../entities/Chat';
import Ride from '../../../entities/Ride';
import User from '../../../entities/User';
import {
  UpdateRideStatusMutationArgs,
  UpdateRideStatusResponse,
} from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Mutation: {
    UpdateRideStatus: privateResolver(
      async (
        _,
        args: UpdateRideStatusMutationArgs,
        { req, pubSub }
      ): Promise<UpdateRideStatusResponse> => {
        const user: User = req.user;
        // Only driver can update the status
        if (user.isDriving) {
          try {
            let ride: Ride | undefined;
            if (args.status === config.RIDESTATUS.ACCEPTED) {
              ride = await Ride.findOne(
                {
                  id: args.rideId,
                  status: config.RIDESTATUS.REQUESTING,
                },
                { relations: ['passenger', 'driver'] }
              );
              if (ride) {
                ride.driver = user;
                user.isTaken = true;
                user.save();
                const chat = await Chat.create({
                  driver: user,
                  passenger: ride.passenger,
                }).save();
                ride.chat = chat;
                ride.save();
              }
            } else {
              ride = await Ride.findOne(
                {
                  id: args.rideId,
                  driver: user,
                },
                { relations: ['passenger', 'driver'] }
              );
            }
            if (ride) {
              ride.status = args.status;
              ride.save();
              pubSub.publish(config.SUBSCRIPTION_CHANNEL.RIDEUPDATE, {
                [config.SUBSCRIPTION.RIDESTATUSSUBSCRIPTION]: ride,
              });
              if (ride.status === config.RIDESTATUS.FINISHED) {
                user.isTaken = false;
                await user.save();
                const passenger: User = ride.passenger;
                passenger.isRiding = false;
                await passenger.save();
              }
              return {
                ok: true,
                error: null,
                rideId: ride.id,
              };
            } else {
              return {
                ok: false,
                error: "Can't update ride",
                rideId: null,
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              rideId: null,
            };
          }
        } else {
          return {
            ok: false,
            error: 'You are not driving',
            rideId: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
