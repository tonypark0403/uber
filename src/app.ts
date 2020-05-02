import cors from 'cors';
import { NextFunction, Response } from 'express';
import { GraphQLServer } from 'graphql-yoga';
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
  constructor() {
    this.app = new GraphQLServer({
      schema,
      context: (express) => {
        return {
          req: express.request,
        };
      },
    });
    this.middlewares();
  }
}

export default new App().app;
