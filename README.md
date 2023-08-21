# Dowell-Payment Package

## Version 1.0.28

### Description

Welcome to the Dowell Payment package!.A simple npm package for initiating and verifying payments using Stripe or PayPal.

### Installation

Install the package using npm:

```bash
npm install dowellpayment
```

### Usage

Import the package and use the Payment class to initiate and verify payments using either Stripe or PayPal.

### Example

```javascript
import {Payment} from 'dowellpayment';

import { useState } from 'react';

const App = () => {
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [paymentResult, setPaymentResult] = useState();
  const [approvalUrl, setApprovalUrl] = useState();
  const [paymentId, setPaymentId] = useState();

  const handleInitializePayment = async () => {
    const payment = new Payment();

    try {


      const initializationResult = await payment.initializePayment({
        paymentMethod: paymentMethod,
        price: 20,
        product: 'sample name',
        currency_code: 'usd',
        callback_url: 'https://www.google.com',
        timezone: 'Asia/Calcutta',
        description: 'credit',
        credit: '1000',
      });

      const data = JSON.parse(initializationResult);
      setApprovalUrl(data.approval_url);
      setPaymentId(data.payment_id);
    } catch (error) {
      console.error('Error while initializing payment', error);
    }
  };

  const handleVerifyPayment = async () => {
    try {
      const payment = new Payment();

      const response = await payment.verifyPayment({paymentMethod, paymentId});
      setPaymentResult(response);
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };
  return (
    <div>
      <h1>Payment Component</h1>
      <label>
        Payment Method:
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
        </select>
      </label>
      <button onClick={handleInitializePayment}>Initiate Payment</button>
      <a href={approvalUrl}>{approvalUrl}</a>
      <hr />
      {approvalUrl && (
        <div>
          <button onClick={handleVerifyPayment}>Verify Payment</button>
          <p>Payment Result:</p>
          <pre>{paymentResult}</pre>
        </div>
      )}
    </div>
  );
};

export default App;

```

### API

initializePayment(paymentMethod, price, product, currency, callbackUrl, timezone, description, credit)
Initiates a payment using the specified payment method (paypal or stripe).

1. -`paymentMethod`: Your Payment method of choice(Paypal or Stripe).
2. -`price`: The price of the product(Paypal only supported price of 2 decimal point at most and Stripe only support whole number).
3. -`product`: The name of the product.
4. -`currency`: The currency code (e.g., 'usd').
5. -`callbackUrl`: The URL to which the payment service will redirect after payment.
6. -`timezone`, `description`,`credit`: They are used to generate a voucher(Omit them if voucher is not necessary).

-`verifyPayment(paymentMethod, paymentId)`

Verifies a payment using the specified payment method (paypal or stripe).

1. -`paymentMethod`: Your Payment method of choice(Paypal or Stripe).
2. -`paymentId`: The ID of the payment to verify.

### NOTE

1. Stripe supports paying in local currency across more than 135 countries.

2. PayPal supports paying in local currency in 25 countries.

3. And also Paypal only supported price of 2 decimal point at most as part of the request body While Stripe only support whole number

### License

This project is licensed under the Apache License 2.0.
