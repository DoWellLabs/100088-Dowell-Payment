class StripePayment {
  async initializePayment(
    apiKey,
    price,
    product,
    currency,
    callbackUrl,
    stripe_key
  ) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        price,
        product,
        currency_code: currency,
        callback_url: callbackUrl,
        stripe_key,
      }),
      redirect: 'follow',
    };

    const url = `https://100088.pythonanywhere.com/api/stripe/initialize/public/${apiKey}`;

    const response = await fetch(url, requestOptions);
    return response.text();
  }

  async verifyPayment(apiKey, paymentId, stripe_key) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        id: paymentId,
        stripe_key,
      }),
      redirect: 'follow',
    };

    const url = `https://100088.pythonanywhere.com/api/verify/payment/stripe/public/${apiKey}`;

    const response = await fetch(url, requestOptions);
    return response.text();
  }
}

export default StripePayment;
