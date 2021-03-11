import Router from 'koa-router';
import login from './login';
import proceedAuth from './proceedAuth';
import refreshToken from './refreshToken';

const router = new Router();

router.get('/login', login);
router.post('/proceedAuth', proceedAuth);
router.post('/refreshToken', refreshToken);

export { router };
