import React from 'react';
import Header from '../components/Header';
import CurrencyForm from '../components/ExpenseForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <CurrencyForm />
      </div>
    );
  }
}

export default Wallet;
