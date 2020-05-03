import { Resolvers } from 'src/types/resolvers';
import config from '../../../config';
import Chat from '../../../entities/Chat';
import Message from '../../../entities/Message';
import User from '../../../entities/User';
import {
  SendChatMessageMutationArgs,
  SendChatMessageResponse,
} from '../../../types/graph';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Mutation: {
    SendChatMessage: privateResolver(
      async (
        _,
        args: SendChatMessageMutationArgs,
        { req, pubSub }
      ): Promise<SendChatMessageResponse> => {
        const user: User = req.user;
        try {
          const chat = await Chat.findOne({
            id: args.chatId,
          });
          if (chat) {
            if (chat.passengerId === user.id || chat.driverId === user.id) {
              const message = await Message.create({
                text: args.text,
                chat,
                user,
              }).save();
              pubSub.publish(config.SUBSCRIPTION_CHANNEL.NEWCHATMESSAGE, {
                [config.SUBSCRIPTION.MESSAGESUBSCRIPTION]: message,
              });
              return {
                ok: true,
                error: null,
                message,
              };
            } else {
              return {
                ok: false,
                error: 'Unauthorized!',
                message: null,
              };
            }
          } else {
            return {
              ok: false,
              error: 'Chat is not found',
              message: null,
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            message: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
