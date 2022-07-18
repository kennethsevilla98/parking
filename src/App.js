import "./App.css";
import Parking from "./views/Parking";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Exit from "./views/Exit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Parking />} />
        <Route path="/exit" element={<Exit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
