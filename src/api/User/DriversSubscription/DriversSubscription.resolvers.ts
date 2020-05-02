import config from '../../../config';

const resolvers = {
  Subscription: {
    DriversSubscription: {
      subscribe: (_, __, { pubSub }) => {
        return pubSub.asyncIterator(config.CHANNEL.DRIVERUPDATE);
      },
    },
  },
};

export default resolvers;
