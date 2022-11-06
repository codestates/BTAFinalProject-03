import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import GetTx from "./pages/GetTx";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-tx/:txId" element={<GetTx />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
