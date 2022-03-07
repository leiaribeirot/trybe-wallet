const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';
const MAX_CURRENCY_LENGTH = 3;

export const getExchangeRates = async () => {
  const response = await fetch(ENDPOINT);
  const data = await response.json();

  return data;
};

export const getCurrencies = async () => {
  const response = await fetch(ENDPOINT);
  const data = await response.json();

  return Object.keys(data).filter(
    (currency) => currency.length === MAX_CURRENCY_LENGTH,
  );
};
