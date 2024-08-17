import React  from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home";
import About from "./pages/About";
const app=()=>{
  return (
    <BrowserRouter>   
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default app;