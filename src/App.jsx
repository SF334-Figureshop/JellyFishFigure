import Navbar from "./Component/Navbar/Navbar"
import Home from "./Page/Home/Home"
import Login from "./Page/Auth/Login"
import SignUp from "./Page/Auth/SignUp"
import Trending from "./Page/Home/Trending/Trending"
import {  Routes, Route } from "react-router-dom";
import Footer from "./Component/Navbar/Footer"
import New from "./Page/New/New"
import Cart from "./Page/Cart/Cart"

function App() {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/trending" element={<Trending />} />
        <Route path ="/new" element={<New />} />
        <Route path="/product/:figure" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
    </Routes>
    <Footer />
    </>
  );
}


export default App
