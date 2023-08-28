class DowellPaypal {
  async initializePayment({
    apiKey,
    price,
    product,
    currency_code,
    callback_url,
    paypal_client_id,
    paypal_secret_key,
    mode,
  }) {
    try {
      const serviceResult = await this.runServiceRequest({
        apiKey,
      });
      // console.log(JSON.parse(serviceResult));
      console.log(JSON.parse(serviceResult).success);

      if (JSON.parse(serviceResult).success == false) {
        console.error(
          'Service request failed:',
          JSON.parse(serviceResult).message
        );
        return JSON.parse(serviceResult).message; // Don't proceed with payment initialization
      }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: price,
          product: product,
          currency_code: currency_code,
          callback_url: callback_url,
          paypal_client_id: paypal_client_id,
          paypal_secret_key: paypal_secret_key,
          mode: mode,
        }),
        redirect: 'follow',
      };

      const url = `https://100088.pythonanywhere.com/api/paypal/initialize/public-use`;

      const response = await fetch(url, requestOptions);

      return response.text();
    } catch (error) {
      console.error('Error initializing payment:', error.message);
    }
  }

  async verifyPayment({ apiKey, paymentId }) {
    try {
      const serviceResult = await this.runServiceRequest({
        apiKey,
      });

      if (JSON.parse(serviceResult).success == false) {
        console.error(
          'Service request failed:',
          JSON.parse(serviceResult).message
        );
        return JSON.parse(serviceResult).message; // Don't proceed with payment verification
      }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paypal_client_id: paypal_client_id,
          paypal_secret_key: paypal_secret_key,
          id: paymentId,
          mode: mode,
        }),
        redirect: 'follow',
      };

      const url = `https://100088.pythonanywhere.com/api/verify/payment/paypal/public-use`;

      const response = await fetch(url, requestOptions);

      return response.text();
    } catch (error) {
      console.error('Error verifying payment:', error.message);
    }
  }

  async runServiceRequest({ apiKey }) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sub_service_ids: ['DOWELL100332'],
          service_id: 'DOWELL10033',
        }),
        redirect: 'follow',
      };

      const service_url = `https://100105.pythonanywhere.com/api/v3/process-services/?type=module_service&api_key=${apiKey}`;

      const serviceResponse = await fetch(service_url, requestOptions);
      // console.log(serviceResponse);

      return serviceResponse.text();
    } catch (error) {
      console.error('Error in service request:', error.message);
    }
  }
}

export default DowellPaypal;
