# Dowell-Payment Package

## Version 1.0.7

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
import React, { useState } from 'react';
import PayPalPayment from 'dowellpayment';

const Paypal = () => {
  const [paymentResult, setPaymentResult] = useState();
  const [approvalUrl, setApprovalUrl] = useState();
  const [paymentId, setPaymentId] = useState();
  const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
  // Add other keys

  const handleInitializePayment = async () => {
    // Initialize the Payment class
    const payment = new PayPalPayment();

    try {
      // Initialize the payment based on the selected payment method
      const initializationResult = await payment.initializePayment(
        apiKey,
        500,
        'Product Name',
        'usd',
        'https://www.google.com',
        'YOUR_PAYPAL_CLIENT_ID',
        'YOUR_PAYPAL_SECRET_KEY',
        mode
      );
      const data = JSON.parse(initializationResult);
      setApprovalUrl(data.approval_url);
      setPaymentId(data.payment_id);

      // setPaymentResult(initializationResult);
    } catch (error) {
      console.error('Error while initializing payment', error);
    }
  };

  const handleVerifyPayment = async () => {
    console.log(paymentId);
    try {
      const payment = new PayPalPayment();

      const response = await payment.verifyPayment(
        apiKey,
        paymentId,
        'YOUR_PAYPAL_CLIENT_ID',
        'YOUR_PAYPAL_SECRET_KEY',
        mode
      );
      setPaymentResult(response);
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };
  return (
    <div>
      <h1>PayPal Payment Component</h1>
      <button onClick={handleInitializePayment}>Initiate Payment</button>
      <br />
      <a href={approvalUrl}>{approvalUrl}</a>
      <hr />
      {paymentId && (
        <div>
          <button onClick={handleVerifyPayment}>Verify Payment</button>
          <p>Payment Result:</p>
          <pre>{paymentResult}</pre>
        </div>
      )}
    </div>
  );
};

export default Paypal;

```

### Stripe Example

```javascript

import React, { useState } from 'react';
import StripePayment from 'dowellpayment';

const Stripe = () => {
  const [paymentResult, setPaymentResult] = useState();
  const [approvalUrl, setApprovalUrl] = useState();
  const [paymentId, setPaymentId] = useState();
  const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
  // Add other keys

  const handleInitializePayment = async () => {
    // Initialize the Payment class
    const payment = new StripePayment();

    try {
      // Initialize the payment based on the selected payment method
      const initializationResult = await payment.initializePayment(
        apiKey,
        500,
        'Product Name',
        'usd',
        'https://www.google.com',
        'YOUR_STRIPE_KEY'
      );
      const data = JSON.parse(initializationResult);
      setApprovalUrl(data.approval_url);
      setPaymentId(data.payment_id);

      // setPaymentResult(initializationResult);
    } catch (error) {
      console.error('Error while initializing payment', error);
    }
  };

  const handleVerifyPayment = async () => {
    console.log(paymentId);
    try {
      const payment = new StripePayment();

      const response = await payment.verifyPayment(
        apiKey,
        paymentId,
        'YOUR_STRIPE_KEY'
      );
      setPaymentResult(response);
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };
  return (
    <div>
      <h1>Stripe Payment Component</h1>
      <button onClick={handleInitializePayment}>Initiate Payment</button>
      <br />
      <a href={approvalUrl}>{approvalUrl}</a>
      <hr />
      {paymentId && (
        <div>
          <button onClick={handleVerifyPayment}>Verify Payment</button>
          <p>Payment Result:</p>
          <pre>{paymentResult}</pre>
        </div>
      )}
    </div>
  );
};

export default Stripe;

```

### API(PAYPAL)

initializePayment(apiKey, price, product, currency, callbackUrl, paypal_client_id, paypal_secret_key,mode)
Initiates a payment using the specified payment method for paypal.

-`apiKey`: Your API key for accessing the payment service.
-`price`: The price of the product.
-`product`: The name of the product.
-`currency`: The currency code (e.g., 'usd').
-`callbackUrl`: The URL to which the payment service will redirect after payment.
-`paypal_client_id`: Your PAYPAL CLIENT ID for accessing paypal payment service.
-`paypal_secret_key`: Your PAYPAL SECRET key for accessing paypal payment service.
-`mode`: The PAYPAL mode of payment.

-`verifyPayment(apiKey, paymentId, paypal_client_id, paypal_secret_key, mode)`

Verifies a payment using the specified payment method for paypal.

-`apiKey`: Your API key for accessing the payment service.
-`paymentId`: The ID of the payment to verify.
-`paypal_client_id`: Your PAYPAL CLIENT ID for accessing paypal payment service.
-`paypal_secret_key`: Your PAYPAL SECRET key for accessing paypal payment service.
-`mode`: The PAYPAL mode of payment.

### API(STRIPE)

initializePayment(apiKey, price, product, currency, callbackUrl, stripe_key)
Initiates a payment using the specified payment method for stripe.

-`apiKey`: Your API key for accessing the payment service.
-`price`: The price of the product.
-`product`: The name of the product.
-`currency`: The currency code (e.g., 'usd').
-`callbackUrl`: The URL to which the payment service will redirect after payment.
-`stripe_key`: Your STRIPE key for accessing stripe payment service.

-`verifyPayment(apiKey, paymentId, stripe_key)`

Verifies a payment using the specified payment method for stripe.

-`apiKey`: Your API key for accessing the payment service.
-`paymentId`: The ID of the payment to verify.
-`stripe_key`: Your STRIPE key for accessing stripe payment service.

### License

This project is licensed under the Apache License 2.0.

``` bash
Replace `'your_api_key'` `'paypal_client_id'` `'paypal_secret_key'` `'stripe_key'` with your actual API key for both the initialization and verification calls. Make sure to include this README.md file in the root directory of your npm package. This README will provide users with an overview of your package, installation instructions, usage examples, and information about the API and license.

```
