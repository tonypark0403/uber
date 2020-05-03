import { withFilter } from 'graphql-yoga';
import config from '../../../config';
import User from '../../../entities/User';

const resolvers = {
  Subscription: {
    RideStatusSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) =>
          pubSub.asyncIterator(config.SUBSCRIPTION_CHANNEL.RIDEUPDATE),
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            [config.SUBSCRIPTION.RIDESTATUSSUBSCRIPTION]: {
              driverId,
              passengerId,
            },
          } = payload;
          return user.id === driverId || user.id === passengerId;
        }
      ),
    },
  },
};

export default resolvers;
