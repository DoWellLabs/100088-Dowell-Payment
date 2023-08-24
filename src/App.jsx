/* eslint-disable no-unused-vars */
import './App.css';
// import Payment from 'dowellpayment';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Paypal from './pages/Paypal';
import Stripe from './pages/Stripe';
import Home from './pages/Home';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/paypal" element={<Paypal />}></Route>
          <Route path="/stripe" element={<Stripe />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;