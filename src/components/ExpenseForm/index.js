import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Input from '../Input';
import Select from '../Select';

import {
  setExpenseThunk,
  fetchCurrencies as fetchCurrenciesThunk,
} from '../../actions';

import './style.css';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class ExpenseForm extends Component {
  constructor() {
    super();

    this.state = INITIAL_STATE;

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.renderInputs = this.renderInputs.bind(this);
    this.renderSelects = this.renderSelects.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    const { fetchCurrencies } = this.props;

    await fetchCurrencies();
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick(event) {
    event.preventDefault();

    const { setExpense, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;

    setExpense({
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
    });

    this.setState(INITIAL_STATE);
  }

  renderInputs() {
    const { value, description } = this.state;

    return (
      <>
        <Input
          labelText="Valor"
          testId="value-input"
          placeholder="0"
          type="number"
          name="value"
          id="value"
          value={ value }
          onChange={ this.handleChange }
        />

        <Input
          labelText="Descrição"
          testId="description-input"
          placeholder="Descrição"
          type="text"
          name="description"
          id="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </>
    );
  }

  renderSelects() {
    const { currency, method, tag } = this.state;
    const { currencies } = this.props;
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <>
        <Select
          labelText="Moeda"
          data-testid="currency-input"
          name="currency"
          id="currency"
          value={ currency }
          onChange={ this.handleChange }
          options={ currencies }
        />

        <Select
          labelText="Método de pagamento"
          data-testid="method-input"
          name="method"
          id="method"
          value={ method }
          onChange={ this.handleChange }
          options={ methods }
        />

        <Select
          labelText="Tag"
          data-testid="tag-input"
          name="tag"
          id="tag"
          value={ tag }
          onChange={ this.handleChange }
          options={ tags }
        />
      </>
    );
  }

  render() {
    return (
      <form className="currency-form">
        {this.renderInputs()}
        {this.renderSelects()}

        <button type="button" onClick={ this.handleClick } className="add-expense">
          Adicionar Despesa
        </button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  setExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  currencies: wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  setExpense: (expense) => dispatch(setExpenseThunk(expense)),
  fetchCurrencies: (expense) => dispatch(fetchCurrenciesThunk(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
