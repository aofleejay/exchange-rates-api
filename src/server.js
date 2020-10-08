const Koa = require("koa");
const Router = require("koa-router");
const rateContoller = require("./controllers/rate");
const symbolController = require("./controllers/symbol");

const app = new Koa();
const router = new Router();

router.get("/ping", (ctx) => (ctx.body = "pong"));
router.get("/symbols", symbolController.get);
router.get("/rates", rateContoller.get);

app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
