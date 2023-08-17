class Payment {
  async initializePayment(
    paymentMethod,
    price,
    product,
    currency_code,
    callback_url,
    timezone,
    description,
    credit
  ) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        price: price,
        product: product,
        currency_code: currency_code,
        callback_url: callback_url,
        timezone: timezone,
        description: description,
        credit: credit,
      }),
      redirect: 'follow',
    };
    const url = `https://100088.pythonanywhere.com/api/${paymentMethod}/initialize`;

    const response = await fetch(url, requestOptions);
    return response.text();
  }

  async verifyPayment(paymentMethod, paymentId) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: paymentId,
      }),
      redirect: 'follow',
    };

    const url = `https://100088.pythonanywhere.com/api/verify/payment/${paymentMethod}`;

    const response = await fetch(url, requestOptions);
    return response.text();
  }
}

export default Payment;
