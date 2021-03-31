import Router from 'koa-router';
import login from './login';
import proceedAuth from './proceedAuth';
import refreshToken from './refreshToken';
import { server as apolloServer } from '../apollo';
import { GRAPHQL_PATH } from '../constants';
import { userMiddleware } from '../middlewares/userMiddleware';

const router = new Router();

router.all(
  GRAPHQL_PATH,
  userMiddleware,
  apolloServer.getMiddleware({
    path: GRAPHQL_PATH,
  }),
);

router.get('/login', login);
router.post('/proceedAuth', proceedAuth);
router.post('/refreshToken', refreshToken);

export { router };
