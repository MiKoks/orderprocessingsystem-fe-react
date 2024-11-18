import './App.css';
import OrderForm from './components/OrderForm';
import React from 'react';
import OrderStatus from './components/OrderStatus';

function App() {
  return (
      <div className="App">
          <h1>Order Processing System</h1>
          <OrderForm />
          <OrderStatus />
      </div>
  );
}

export default App;
