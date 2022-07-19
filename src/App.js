import "./App.css";
import Parking from "./views/Parking";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Exit from "./views/Exit";
import Setting from "./views/Setting";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getParkingSlot } from "./state/action-creators";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getParkingSlot());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/parking/:entryNo" element={<Parking />} />
        <Route path="/exit" element={<Exit />} />
        <Route path="/settings" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
