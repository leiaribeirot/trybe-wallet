import React from 'react';
import Header from '../components/Header';
import CurrencyForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <div>
          <Header />
          <CurrencyForm />
        </div>
        <ExpenseTable />
      </>
    );
  }
}

export default Wallet;
