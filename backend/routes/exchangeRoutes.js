import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const exchangeRouter = express.Router();

let usdToUahCache = {
  rate: null,
  exchangedate: null,
  fetchedAt: 0,
};

const CACHE_TTL_MS = 1000 * 60 * 60;

const fetchUsdToUahRate = async () => {
  const response = await fetch(
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json'
  );

  if (!response.ok) {
    throw new Error('Unable to fetch exchange rate from NBU');
  }

  const data = await response.json();
  const usdRate = Array.isArray(data) ? data[0] : null;

  if (!usdRate?.rate) {
    throw new Error('Unexpected exchange rate response from NBU');
  }

  return {
    rate: Number(usdRate.rate),
    exchangedate: usdRate.exchangedate || null,
  };
};

exchangeRouter.get(
  '/usd-uah',
  expressAsyncHandler(async (req, res) => {
    const now = Date.now();

    if (
      usdToUahCache.rate !== null &&
      now - usdToUahCache.fetchedAt < CACHE_TTL_MS
    ) {
      return res.send({
        rate: usdToUahCache.rate,
        exchangedate: usdToUahCache.exchangedate,
        source: 'cache',
      });
    }

    const latestRate = await fetchUsdToUahRate();
    usdToUahCache = {
      rate: latestRate.rate,
      exchangedate: latestRate.exchangedate,
      fetchedAt: now,
    };

    res.send({
      rate: latestRate.rate,
      exchangedate: latestRate.exchangedate,
      source: 'nbu',
    });
  })
);

export default exchangeRouter;
