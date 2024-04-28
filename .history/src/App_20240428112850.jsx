import Navbar from "./Component/Navbar/Navbar"
import Home from "./Page/Home/Home"
import Login from "./Page/Auth/Login"
import SignUp from "./Page/Auth/SignUp"
import Trending from "./Page/Home/Trending/Trending"
import {  Routes, Route } from "react-router-dom";
import Footer from "./Component/Navbar/Footer"
import New from "./Page/New/New"
import Cart from "./Page/Ecommerce/Cart"
import FigureDetails from "./Page/Figure/FigureDetails"
import Admin from "./Page/Admin/Admin"
import EditFigure from "./Page/EditFigure/EditFigure"
import CheckOut from "./Page/Confirm/CheckOut"
function App() {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/trending" element={<Trending />} />
        <Route path ="/new" element={<New />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/figure/:id" element={<FigureDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/editfigure" element={<EditFigure />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/editfigure/:id" element={<EditFigure />} />
    </Routes>
   
    
    </>
  );
}


export default App
