import { withFilter } from 'graphql-yoga';
import config from '../../../config';
import Chat from '../../../entities/Chat';
import User from '../../../entities/User';

const resolvers = {
  Subscription: {
    MessageSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) =>
          pubSub.asyncIterator(config.SUBSCRIPTION_CHANNEL.NEWCHATMESSAGE),
        async (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            [config.SUBSCRIPTION.MESSAGESUBSCRIPTION]: { chatId },
          } = payload;
          try {
            const chat = await Chat.findOne({ id: chatId });
            if (chat) {
              return chat.driverId === user.id || chat.passengerId === user.id;
            } else {
              return false;
            }
          } catch (error) {
            return false;
          }
        }
      ),
    },
  },
};

export default resolvers;
