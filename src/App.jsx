import Navbar from "./Component/Navbar/Navbar"
import Home from "./Page/Home/Home"
import Login from "./Page/Auth/Login"
import SignUp from "./Page/Auth/SignUp"
import Trending from "./Page/Home/Trending/Trending"
import {  Routes, Route } from "react-router-dom";
import Footer from "./Component/Navbar/Footer"

function App() {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/browse" element={<Trending />} />
    </Routes>
    <Footer />
    </>
  );
}


export default App
