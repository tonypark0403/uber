import { Resolvers } from 'src/types/resolvers';
import Place from '../../../entities/Place';
import User from '../../../entities/User';
import {
  DeletePlaceMutationArgs,
  DeletePlaceResponse,
} from '../../../types/graph';
import privateResolver from '../../../utils/privateResolver';

const resolvers: Resolvers = {
  Mutation: {
    DeletePlace: privateResolver(
      async (
        _,
        args: DeletePlaceMutationArgs,
        { req }
      ): Promise<DeletePlaceResponse> => {
        const user: User = req.user;
        try {
          const place = await Place.findOne({ id: args.placeId });
          if (place) {
            if (place.userId === user.id) {
              await place.remove();
              return {
                ok: true,
                error: null,
              };
            } else {
              return {
                ok: false,
                error: 'Not authorized!',
              };
            }
          } else {
            return {
              ok: false,
              error: 'Place is not found!',
            };
          }
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