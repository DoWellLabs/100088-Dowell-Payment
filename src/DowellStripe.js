class DowellStripe {
  async initializePayment({
    price,
    product,
    currency_code,
    callback_url,
    timezone,
    description,
    credit,
    apiKey,
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
          timezone: timezone,
          description: description,
          credit: credit,
        }),
        redirect: 'follow',
      };

      const url = `https://100088.pythonanywhere.com/api/stripe/initialize`;

      const response = await fetch(url, requestOptions);

      return response.text();
    } catch (error) {
      console.error('Error initializing payment:', error.message);
    }
  }

  async verifyPayment({ paymentId, apiKey }) {
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
          id: paymentId,
        }),
        redirect: 'follow',
      };

      const url = `https://100088.pythonanywhere.com/api/verify/payment/stripe`;

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
          sub_service_ids: ['DOWELL100331'],
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

export default DowellStripe;
