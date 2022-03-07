import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Logo from '../../pages/Logo.png';

import './style.css';

class Header extends Component {
  totalExpenses() {
    const { expenses } = this.props;
    // valores vindos da API para fazer conversão de moeda
    return expenses.reduce((acc, { value, exchangeRates, currency }) => {
      const convertedValue = value * exchangeRates[currency].ask;
      return acc + convertedValue;
    }, 0);
  }

  render() {
    const { email } = this.props;
    const totalExpenses = this.totalExpenses();

    return (
      <header>
        <div>
          <img className="logo-img" src={ Logo } alt="LogoComponente" />
        </div>
        <p className="edit-email" data-testid="email-field">{`Email: ${email}`}</p>
        <p className="edit-field" data-testid="total-field">
          {`Despesas totais: R$ ${totalExpenses.toFixed(2)}`}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
