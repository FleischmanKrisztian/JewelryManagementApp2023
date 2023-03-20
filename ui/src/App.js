import Navbar from "./Navbar"
import TypeListing from "./pages/JewelryTypes/Listing"
import TypeCreate from "./pages/JewelryTypes/Create"
import TypeEdit from "./pages/JewelryTypes/Edit"
import JewelryListing from "./pages/Jewelries/Listing"
import JewelryCreate from "./pages/Jewelries/Create"
import JewelryEdit from "./pages/Jewelries/Edit"
// import Sales from "./pages/Sales"
import './App.css';
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>

          <Route path="/jewelries" element={<JewelryListing />} />
          <Route path="/jewelries/create" element={<JewelryCreate />} />
          <Route path="/jewelries/edit/:jewelryid" element={<JewelryEdit />} />

          <Route path="/jewelryTypes" element={<TypeListing />} />
          <Route path='/jewelryTypes/create' element={<TypeCreate />}></Route>
          <Route path='/jewelryTypes/edit/:typeid' element={<TypeEdit />}></Route>
          
          {/* <Route path="/sales" element={<Sales />} /> */}
        </Routes>
      </div>
    </>
  )
}

export default App
