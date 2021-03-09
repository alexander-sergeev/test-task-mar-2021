import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { server as apolloServer } from './apollo';
import { router } from './routes';

const app = new Koa();
app.use(apolloServer.getMiddleware());

app.use(bodyParser());
app.use(router.routes());

app.listen({ port: process.env.PORT }, () =>
  console.log(`Server is listening at port ${process.env.PORT}`),
);
