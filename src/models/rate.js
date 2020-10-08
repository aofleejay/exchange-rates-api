const axios = require("axios");
const qs = require("qs");

const { FIXER_API_ENDPOINT, FIXER_API_KEY } = process.env;

const rateService = {
  get: async ({ base }) => {
    const query = qs.stringify({ access_key: FIXER_API_KEY });

    const response = await axios.get(`${FIXER_API_ENDPOINT}/latest?${query}`);
    const { rates, date } = await response.data;

    const convertedFromBase = {};
    Object.keys(rates).forEach((rate) => {
      convertedFromBase[rate] = rates[rate] / rates[base];
    });

    return convertedFromBase;
  },
};

module.exports = rateService;
