const symbolModel = require("../models/symbol");

const symbolController = {
  get: async (ctx) => {
    try {
      const symbols = await symbolModel.get();
      ctx.status = 200;
      ctx.body = { symbols };
    } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = { code: "INTERNAL_SERVER_ERROR" };
    }
  },
};

module.exports = symbolController;
