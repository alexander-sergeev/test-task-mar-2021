import Router from 'koa-router';
import login from './login';
import proceedAuth from './proceedAuth';

const router = new Router();

router.get('/login', login);
router.post('/proceedAuth', proceedAuth);

export { router };
