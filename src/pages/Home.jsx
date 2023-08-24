import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>
        <Link to="/paypal"><button>Paypal Payment</button></Link>
      </div>
      <div>
        <Link to="/stripe"><button>Stripe Payment</button></Link>
      </div>
    </div>
  );
};

export default Home;
