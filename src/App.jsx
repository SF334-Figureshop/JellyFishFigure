import Navbar from "./Component/Navbar/Navbar"
import Home from "./Page/Home/Home"
import Login from "./Page/Auth/Login"
import SignUp from "./Page/Auth/SignUp"
import {  Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp  />} />
    </Routes>
    </>
  );
}


export default App
