const axios = require("axios");

const EXCHANGE_RATES_API = "https://api.exchangeratesapi.io";

const rates = {
  get: async (base) => {
    const response = await axios.get(
      `${EXCHANGE_RATES_API}/latest?base=${base.toUpperCase()}`
    );
    const rates = await response.data;
    return rates;
  },
};

module.exports = rates;
