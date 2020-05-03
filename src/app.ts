import cors from 'cors';
import { NextFunction, Response } from 'express';
import { GraphQLServer, PubSub } from 'graphql-yoga';
import helmet from 'helmet';
import logger from 'morgan';
import config from './config';
import schema from './schema';
import decodeJWT from './utils/decodeJWT';

class App {
  private middlewares = (): void => {
    // express is the server part in Graphql server
    this.app.express.use(cors());
    this.app.express.use(logger('dev'));
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  private jwt = async (
    req,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get(config.AUTH.TOKEN_COOKIE);
    if (token) {
      const user = await decodeJWT(token);
      if (user) {
        req.user = user;
        // console.log('user by token:', req);
      } else {
        req.user = undefined;
      }
    }
    next();
  };

  public app: GraphQLServer;
  public pubSub: any;
  constructor() {
    this.pubSub = new PubSub(); // this is only for demo, in production redis or memcached should be used..
    this.pubSub.ee.setMaxListeners(99);
    this.app = new GraphQLServer({
      schema,
      context: (gqlRequest) => {
        // console.log('express:', gqlRequest.connection.context.currentUser);
        const { connection: { context = null } = {} } = gqlRequest;
        return {
          req: gqlRequest.request,
          pubSub: this.pubSub,
          context,
        };
      },
    });
    this.middlewares();
  }
}

export default new App().app;
