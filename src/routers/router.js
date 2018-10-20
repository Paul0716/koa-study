const Router = require('koa-router');
const router = new Router();
const dream = require('dreamjs');

router.get('/posts', async (ctx, next) => {
    const mock = dream
      .schema({ name: /^[A-Z]{1}[a-z]{6}$/, id: Number })
      .generateRnd(200)
      .output();
    await ctx.render('posts.jade', {
        data: mock,
    });
});

router.head("/posts", (ctx, next) => {
    console.log(ctx);
    throw(404);
    next();
});

module.exports = router;