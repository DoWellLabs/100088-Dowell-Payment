class Payment {
  async initializePayment({
    paymentMethod,
    price,
    product,
    currency_code,
    callback_url,
    timezone,
    description,
    credit,
    apiKey,
    sub_service_ids,
    service_id,
  }) {
    try {
      const serviceResult = await this.runServiceRequest({
        apiKey,
        sub_service_ids,
        service_id,
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

      const url = `https://100088.pythonanywhere.com/api/${paymentMethod}/initialize`;

      const response = await fetch(url, requestOptions);

      return response.text();
    } catch (error) {
      console.error('Error initializing payment:', error.message);
    }
  }

  async verifyPayment({
    paymentMethod,
    paymentId,
    apiKey,
    sub_service_ids,
    service_id,
  }) {
    try {
      const serviceResult = await this.runServiceRequest({
        apiKey,
        sub_service_ids,
        service_id,
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

      const url = `https://100088.pythonanywhere.com/api/verify/payment/${paymentMethod}`;

      const response = await fetch(url, requestOptions);

      return response.text();
    } catch (error) {
      console.error('Error verifying payment:', error.message);
    }
  }

  async runServiceRequest({ apiKey, sub_service_ids, service_id }) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sub_service_ids: sub_service_ids,
          service_id: service_id,
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

export default Payment;
