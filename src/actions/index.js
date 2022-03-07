import { getExchangeRates, getCurrencies } from '../utils/Api';

// Coloque aqui suas actions
const ACTIONS = {
  SET_EMAIL: 'SET_EMAIL',
  SET_EXPENSE: 'SET_EXPENSE',
  SET_CURRENCIES: 'SET_CURRENCIES',
  FETCH_API: 'FETCH_API',
};

const fetchApi = () => ({ type: ACTIONS.FETCH_API });

export const setEmail = (email) => ({
  type: ACTIONS.SET_EMAIL,
  payload: email,
});

const setCurrencies = (currencies) => ({
  type: ACTIONS.SET_CURRENCIES,
  payload: currencies,
});

const setExpense = (expense) => ({
  type: ACTIONS.SET_EXPENSE,
  payload: expense,
});

export const setExpenseThunk = (expense) => async (dispatch) => {
  dispatch(fetchApi());

  const exchangeRates = await getExchangeRates();

  dispatch(setExpense({ ...expense, exchangeRates }));
};

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(fetchApi());

  const currencies = await getCurrencies();

  dispatch(setCurrencies(currencies));
};

export default ACTIONS;
