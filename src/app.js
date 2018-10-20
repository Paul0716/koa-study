const Koa = require("koa");
const app = new Koa();
const router = require('./routers/router');
const views = require("koa-views");

app.use(views(
    __dirname + '/views',
    {
        map: {
            pug: 'pug'
        },
        extension: 'pug',
    }
));

app.use(router.routes());

// logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async ctx => {
    ctx.body = 'Hello World';
    ctx.throw(400);
    ctx.throw(400, 'name required');
});

app.listen(3000, () => {
    console.log('Server is listening...');
});