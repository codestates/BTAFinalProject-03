import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import GetTx from "./pages/GetTx";
import Home from "./pages/Home";
import GetAddr from "./pages/GetAddr";
import GetObj from "./pages/GetObj";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-tx/:txId" element={<GetTx />} />
        <Route path="/get-addr/:addr" element={<GetAddr />} />
        <Route path="/get-obj/:objId" element={<GetObj />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
