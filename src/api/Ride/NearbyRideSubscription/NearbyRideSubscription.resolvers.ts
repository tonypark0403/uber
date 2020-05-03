import { withFilter } from 'graphql-yoga';
import config from '../../../config';
import User from '../../../entities/User';

const resolvers = {
  Subscription: {
    NearbyRideSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) =>
          pubSub.asyncIterator(config.SUBSCRIPTION_CHANNEL.RIDEREQUEST),
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            [config.SUBSCRIPTION.NEARBYRIDESUBSCRIPTION]: {
              pickUpLat,
              pickUpLng,
            },
          } = payload;
          const { lastLat: userLastLat, lastLng: userLastLng } = user;
          return (
            pickUpLat >= userLastLat - 0.05 &&
            pickUpLat <= userLastLat + 0.05 &&
            pickUpLng >= userLastLng - 0.05 &&
            pickUpLng <= userLastLng + 0.05
          );
        }
      ),
    },
  },
};

export default resolvers;
