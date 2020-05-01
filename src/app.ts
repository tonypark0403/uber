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
    const token = req.get(config.TOKEN_COOKIE);
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
      // option
      schema,
      context: (express) => {
        // console.log('context:', express.request);
        return {
          req: express.request,
        };
      },
      // context: { // second parameter를 통해서 data를 graphql에 context로 보낼수 있음
      // developer: "Tony Park" // 이렇게 하면 이 정보가 resolvers에 3번째 파라미터로 넘어감
      // 또한 위에처럼 function도 가능
      // }
    });
    this.middlewares();
  }
}

export default new App().app;
