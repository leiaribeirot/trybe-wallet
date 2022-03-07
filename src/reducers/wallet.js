import ACTIONS from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTIONS.SET_CURRENCIES:
    return { ...state, currencies: action.payload };
  case ACTIONS.SET_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default walletReducer;
