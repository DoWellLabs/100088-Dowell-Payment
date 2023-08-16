class PayPalPayment {
  async initializePayment(
    apiKey,
    price,
    product,
    currency,
    callbackUrl,
    paypal_client_id,
    paypal_secret_key
  ) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        price:price,
        product:product,
        currency_code: currency,
        callback_url: callbackUrl,
        paypal_client_id: paypal_client_id,
        paypal_secret_key:paypal_secret_key,
      }),
      redirect: 'follow',
    };

    const url = `https://100088.pythonanywhere.com/api/paypal/initialize/public/${apiKey}`;

    const response = await fetch(url, requestOptions);
    return response.text();
  }

  async verifyPayment(apiKey, paymentId, paypal_client_id, paypal_secret_key) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        id: paymentId,
        paypal_client_id,
        paypal_secret_key,
      }),
      redirect: 'follow',
    };

    const url = `https://100088.pythonanywhere.com/api/verify/payment/paypal/public/${apiKey}`;

    const response = await fetch(url, requestOptions);
    return response.text();
  }
}

export default PayPalPayment;
