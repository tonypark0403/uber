import cors from 'cors';
import { GraphQLServer } from 'graphql-yoga';
import helmet from 'helmet';
import logger from 'morgan';
import schema from './schema';

class App {
  private middlewares = (): void => {
    //express is the server part in Graphql server
    this.app.express.use(cors());
    this.app.express.use(logger('dev'));
    this.app.express.use(helmet());
  };
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({
      //option
      schema,
    });
    this.middlewares();
  }
}

export default new App().app;
