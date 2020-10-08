const rateModel = require("../models/rate");

const rateController = {
  get: async (ctx) => {
    try {
      if (!ctx.query.base) {
        ctx.status = 422;
        ctx.body = {
          code: "UNPROCESSABLE_ENTITY",
          message: 'Query string "base" is required.',
        };
      } else {
        const rates = await rateModel.get({
          base: ctx.query.base,
        });
        ctx.status = 200;
        ctx.body = { rates };
      }
    } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = { code: "INTERNAL_SERVER_ERROR" };
    }
  },
};

module.exports = rateController;
