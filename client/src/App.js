import React  from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Register from "./pages/Register"
import Login from "./pages/Login"
const app=()=>{
  return (
    <BrowserRouter>   
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default app;