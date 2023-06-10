import Checkout from "./components/Checkout/Checkout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Card from "./components/Cards/Card";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Checkout />}></Route>
          <Route path="/card" element={<Card />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
