import { Resolvers } from 'src/types/resolvers';
import Place from '../../../entities/Place';
import User from '../../../entities/User';
import { AddPlaceMutationArgs, AddPlaceResponse } from '../../../types/graph';
import privateResolver from '../../../utils/privateResolver';
const resolvers: Resolvers = {
  Mutation: {
    AddPlace: privateResolver(
      async (
        _,
        args: AddPlaceMutationArgs,
        { req }
      ): Promise<AddPlaceResponse> => {
        const user: User = req.user;
        try {
          await Place.create({ ...args, user }).save(); // args가 all mandatory라 notNull 필요없음
          return {
            ok: true,
            error: null,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
          };
        }
      }
    ),
  },
};

export default resolvers;
