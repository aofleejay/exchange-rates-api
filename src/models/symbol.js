const axios = require("axios");
const qs = require("qs");

const { FIXER_API_ENDPOINT, FIXER_API_KEY } = process.env;

const symbolService = {
  get: async () => {
    const query = qs.stringify({ access_key: FIXER_API_KEY });

    const response = await axios.get(`${FIXER_API_ENDPOINT}/symbols?${query}`);
    const symbolsObject = await response.data.symbols;
    const symbols = Object.keys(symbolsObject);

    return symbols;
  },
};

module.exports = symbolService;
