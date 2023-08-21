# Dowell-Payment Package

## Version 1.0.33

### Description

Welcome to the Dowell Payment package!.A simple npm package for initiating and verifying payments using Stripe or PayPal.

### Installation

Install the package using npm:

```bash
npm install dowellpayment
```

### Usage

Import the package and use the Payment class to initiate and verify payments using either Stripe or PayPal.

### PayPal Example

```javascript
import { useState } from 'react';

import DowellPaypal from 'dowellpayment'; // Adjust the path to the actual location of Payment.js

const PayPal = () => {
  const [paymentResult, setPaymentResult] = useState();
  const [approvalUrl, setApprovalUrl] = useState();
  const [paymentId, setPaymentId] = useState();
  const apiKey = import.meta.env.VITE_API_KEY;

  const handleInitializePayment = async () => {
    try {
      const userEnteredPrice = 500.5; // Example user input (replace with actual user input)
      let formattedPrice = parseFloat(userEnteredPrice).toFixed(2);

      const initializationResult = await new DowellPaypal().initializePayment({
        apiKey: apiKey,
        price: formattedPrice,
        product: 'Product Name',
        currency_code: 'usd',
        callback_url: 'https://www.google.com',
        timezone: 'Asia/Calcutta',
        description: 'credit',
        credit: '1000',
      });
      console.log(initializationResult);

      const data = JSON.parse(initializationResult);
      setApprovalUrl(data.approval_url);
      setPaymentId(data.payment_id);
    } catch (error) {
      console.error('Error while initializing payment', error);
    }
  };

  const handleVerifyPayment = async () => {
    try {
      const response = await new DowellPaypal().verifyPayment({
        apiKey: apiKey,
        paymentId: paymentId,
      });

      if (response === 'false') {
        console.error('Payment verification failed:', response);
      } else {
        setPaymentResult(response);
      }
    } catch (error) {
      console.error('Error verifying payment:', error.message);
    }
  };

  return (
    <div>
      <h1>PayPal Payment Component</h1>
      <button onClick={handleInitializePayment}>Initiate Payment</button>
      <a href={approvalUrl}>{approvalUrl}</a>
      <hr />
      {approvalUrl && (
        <div>
          <button onClick={handleVerifyPayment}>Verify Payment</button>
          <p>Payment Result:</p>
          <pre>{JSON.stringify(paymentResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PayPal;

```

### Stripe Example

```javascript
import { useState } from 'react';

import DowellStripe from 'dowellpayment'; // Adjust the path to the actual location of Payment.js

const Stripe = () => {
  const [paymentResult, setPaymentResult] = useState();
  const [approvalUrl, setApprovalUrl] = useState();
  const [paymentId, setPaymentId] = useState();
  const apiKey = import.meta.env.VITE_API_KEY;

  const handleInitializePayment = async () => {
    try {
      const userEnteredPrice = 500.5; // Example user input (replace with actual user input)
      let formattedPrice = parseInt(userEnteredPrice);

      const initializationResult = await new DowellStripe().initializePayment({
        apiKey: apiKey,
        price: formattedPrice,
        product: 'Product Name',
        currency_code: 'usd',
        callback_url: 'https://www.google.com',
        timezone: 'Asia/Calcutta',
        description: 'credit',
        credit: '1000',
      });
      console.log(initializationResult);

      const data = JSON.parse(initializationResult);
      setApprovalUrl(data.approval_url);
      setPaymentId(data.payment_id);
    } catch (error) {
      console.error('Error while initializing payment', error);
    }
  };

  const handleVerifyPayment = async () => {
    try {
      const response = await new DowellStripe().verifyPayment({
        apiKey: apiKey,
        paymentId: paymentId,
      });

      if (response === 'false') {
        console.error('Payment verification failed:', response);
      } else {
        setPaymentResult(response);
      }
    } catch (error) {
      console.error('Error verifying payment:', error.message);
    }
  };

  return (
    <div>
      <h1>Stripe Payment Component</h1>
      <button onClick={handleInitializePayment}>Initiate Payment</button>
      <a href={approvalUrl}>{approvalUrl}</a>
      <hr />
      {approvalUrl && (
        <div>
          <button onClick={handleVerifyPayment}>Verify Payment</button>
          <p>Payment Result:</p>
          <pre>{JSON.stringify(paymentResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Stripe;

```

### API(PAYPAL)

initializePayment(apiKey,price, product, currency, callbackUrl, timezone, description, credit)
Initiates a payment using the paypal payment method.

1. -`apiKey`: Your API key for accessing the process module service.
2. -`price`: The price of the product(Paypal only supported price of 2 decimal point at most).
3. -`product`: The name of the product.
4. -`currency`: The currency code (e.g., 'usd').
5. -`callbackUrl`: The URL to which the payment service will redirect after payment.
6. -`timezone`, `description`,`credit`: They are used to generate a voucher(Omit them if voucher is not necessary).

-`verifyPayment(paymentId, apiKey)`

Verifies a payment using the specified payment method for paypal.

1. -`apiKey`: Your API key for accessing the process module service.
2. -`paymentId`: The ID of the payment to verify.

### API(STRIPE)

initializePayment(apiKey,price, product, currency, callbackUrl, timezone, description, credit)
Initiates a payment using the stripe payment method.

1. -`apiKey`: Your API key for accessing the process module service.
2. -`price`: The price of the product( Stripe only support whole number).
3. -`product`: The name of the product.
4. -`currency`: The currency code (e.g., 'usd').
5. -`callbackUrl`: The URL to which the payment service will redirect after payment.
6. -`timezone`, `description`,`credit`: They are used to generate a voucher(Omit them if voucher is not necessary).

-`verifyPayment(paymentId, apiKey)`

Verifies a payment using the specified payment method for stripe.

1. -`apiKey`: Your API key for accessing the process module service.
2. -`paymentId`: The ID of the payment to verify.

### NOTE

1. Stripe supports paying in local currency across more than 135 countries.

2. PayPal supports paying in local currency in 25 countries.

3. And also Paypal only supported price of 2 decimal point at most as part of the request body While Stripe only support whole number

### License

This project is licensed under the Apache License 2.0.
