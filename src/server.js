const Koa = require("koa");
const Router = require("koa-router");
const ratesModel = require("./models/rates");

const app = new Koa();
const router = new Router();

router.get("/ping", (ctx) => (ctx.body = "pong"));

router.get("/rates", async (ctx) => {
  try {
    if (!ctx.query.base) {
      ctx.status = 422;
      ctx.body = {
        code: "UNPROCESSABLE_ENTITY",
        message: 'Query string "base" is required.',
      };
    } else {
      const rates = await ratesModel.get(ctx.query.base);
      ctx.status = 200;
      ctx.body = rates;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: "INTERNAL_SERVER_ERROR",
    };
  }
});

app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
