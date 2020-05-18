import Ride from '../../../entities/Ride';
import User from '../../../entities/User';
import { HistoryRidesResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Query: {
    HistoryRides: privateResolver(
      async (_, __, { req }): Promise<HistoryRidesResponse> => {
        const user: User = req.user;
        try {
          const rides: Ride[] = await Ride.find({
            relations: ['passenger', 'driver'],
            where: {
              passengerId: user.id,
            },
          });
          return {
            ok: true,
            error: null,
            rides,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            rides: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
