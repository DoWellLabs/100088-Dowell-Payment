import React from "react";
import { Link } from "react-router-dom";

import "./checkout.css";
import Payhand from "../../assets/payhand.png";
import Google from "../../assets/google.png";
import American from "../../assets/american.png";
import Mastercard from "../../assets/mastercard.png";
import PayPal from "../../assets/PayPal-Logo.png";
import Stripe from "../../assets/stripe.png";
import Visa from "../../assets/visa.svg";

const Checkout = () => {
  // fetch("https://100088.pythonanywhere.com/api/stripe", {
  //   method: "POST",

  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Api-Key sgwF6fcb.RJKV99CLmI8TPM6op4SiZN9PukDJRU2p",
  //   },
  //   body: JSON.stringify({
  //     price: 1500,
  //     product: "Macbook Pro 2023",
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // console.log(data.approval_url);
  //     const stripeLink = data.approval_url;
  //     console.log(stripeLink);
  //     // Handle data
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //   });
  return (
    <>
      <div className="main">
        <div className="main-container">
          <header>Dowell Pay</header>
          <main>
            <div className="topay">
              <div className="topayimg">
                <img src={Payhand} alt="" />
              </div>
              <div className="topayamount">
                <div className="topaycur">USD</div>
                <div className="topayprize">1,000 $</div>
              </div>
            </div>

            <div className="maintext">
              Please choose how to pay. Merchant for this order is Dowell
              Research Limited. Your available payment methods are listed below.{" "}
            </div>

            <div className="paymentoptions">
              <a href="https://stripe.com/payments/checkout">
                {" "}
                <div className="stripeoption">
                  <div className="stripelogo">
                    <img src={Stripe} alt="" />
                  </div>
                </div>
              </a>

              <Link to="/card">
                {" "}
                <div className="cardoptions">
                  <div className="cardtext">Card</div>
                  <div className="visacard">
                    <img src={Visa} alt="" />
                  </div>
                  <div className="mastercard">
                    <img src={Mastercard} alt="" />
                  </div>
                  <div className="americancard">
                    <img src={American} alt="" />
                  </div>
                </div>
              </Link>

              <a href="https://pay.google.com/about/">
                <div className="googleoptions">
                  <div className="googlelogo">
                    <img src={Google} alt="" />
                  </div>
                  <div className="googletext">Pay</div>
                  <div className="googlemasterdcard">
                    <img src={Mastercard} alt="" />
                  </div>
                </div>
              </a>
              <a href="https://www.paypal.com/ng/webapps/mpp/pay-online">
                <div className="paypaloptions">
                  <div className="paypallogo">
                    <img src={PayPal} alt="" />
                  </div>
                </div>
              </a>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Checkout;
