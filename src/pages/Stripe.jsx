import { useState } from 'react';

import { DowellStripe } from '@dowelllabs/dowellpayment'; // Adjust the path to the actual location of Payment.js

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
