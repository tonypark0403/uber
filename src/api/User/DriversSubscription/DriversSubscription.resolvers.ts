import { withFilter } from 'graphql-yoga';
import config from '../../../config';
import User from '../../../entities/User';

const resolvers = {
  Subscription: {
    DriversSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) =>
          pubSub.asyncIterator(config.CHANNEL.DRIVERUPDATE),
        (payload, _, { context }) => {
          // console.log(
          //   'This is coming from the ReportMovement Resolver(payload):',
          //   payload
          // );
          // console.log('Listening(context):', context);
          const user: User = context.currentUser;
          const {
            DriversSubscription: {
              lastLat: driverLastLat,
              lastLng: driverLastLng,
            },
          } = payload;
          const { lastLat: userLastLat, lastLng: userLastLng } = user;
          return (
            driverLastLat >= userLastLat - 0.05 &&
            driverLastLat <= userLastLat + 0.05 &&
            driverLastLng >= userLastLng - 0.05 &&
            driverLastLng <= userLastLng + 0.05
          );
        }
      ),
    },
  },
};

export default resolvers;
