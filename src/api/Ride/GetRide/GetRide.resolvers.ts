import { Resolvers } from 'src/types/resolvers';
import Ride from '../../../entities/Ride';
import User from '../../../entities/User';
import { GetRideResponse } from '../../../types/graph';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Query: {
    GetRide: privateResolver(
      async (_, args, { req }): Promise<GetRideResponse> => {
        const user: User = req.user;
        try {
          const ride: Ride | undefined = await Ride.findOne(
            {
              id: args.rideId,
            },
            { relations: ['passenger', 'driver'] }
          );
          if (ride) {
            if (ride.passengerId === user.id || ride.driverId === user.id) {
              return {
                ok: true,
                error: null,
                ride,
              };
            } else {
              return {
                ok: false,
                error: 'Not Authorized',
                ride,
              };
            }
          } else {
            return {
              ok: false,
              error: 'Ride is not found',
              ride: null,
            };
          }
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
