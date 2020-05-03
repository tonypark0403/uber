import { Resolvers } from 'src/types/resolvers';
import Chat from '../../../entities/Chat';
import User from '../../../entities/User';
import { GetChatQueryArgs, GetChatResponse } from '../../../types/graph';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Query: {
    GetChat: privateResolver(
      async (_, args: GetChatQueryArgs, { req }): Promise<GetChatResponse> => {
        const user: User = req.user;
        try {
          const chat: Chat | undefined = await Chat.findOne(
            {
              id: args.chatId,
            },
            {
              relations: ['messages'],
            }
          );
          if (chat) {
            if (chat.passengerId === user.id || chat.driverId === user.id) {
              return {
                ok: true,
                error: null,
                chat,
              };
            } else {
              return {
                ok: false,
                error: 'Not Authorized to see this chat',
                chat,
              };
            }
          } else {
            return {
              ok: false,
              error: 'Chat is not found',
              chat: null,
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            chat: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
