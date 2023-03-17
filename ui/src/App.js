import Navbar from "./Navbar"
import JewelryTypes from "./pages/JewelryTypes"
import Jewelries from "./pages/Jewelries"
import Sales from "./pages/Sales"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Jewelries />} />
          <Route path="/jewelryTypes" element={<JewelryTypes />} />
          <Route path="/sales" element={<Sales />} />
        </Routes>
      </div>
    </>
  )
}

export default App
