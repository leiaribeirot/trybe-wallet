import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdDelete } from 'react-icons/md';

import './styles.css';
import { removeExpense } from '../../actions';

class ExpensesTable extends Component {
  render() {
    const { expenses, dispatch } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses
            .map(({ id, description, tag, method, value, exchangeRates, currency }) => {
              const currencyName = exchangeRates[currency].name;
              const { ask } = exchangeRates[currency];
              const fixedAsk = Number(ask).toFixed(2);
              const convertedValue = (value * ask).toFixed(2);

              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{(+value).toFixed(2)}</td>
                  <td>{currencyName}</td>
                  <td>{fixedAsk}</td>
                  <td>{convertedValue}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => {
                        dispatch(removeExpense(id));
                      } }
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>);
            })}
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesTable);
