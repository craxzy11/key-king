import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernamechangehandler = (event) => {
    setUsername(event.target.value);
  }

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


  const passwordchangehandler = (event) => {
    setPassword(event.target.value);
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(loginRoute, {
        field: username,
        password,
        method:"1"
      })
      const data= response.data;
      console.log(data);
      if (data.success == true) {
        toast.success("Login was succesful",toastOptions);
      }
    }
    catch (err) {
      console.log(err);
      toast.error(`${err.response.data.message}`, toastOptions);
    }
  }
  return (
    <>
    
      <FormContainer>
        <form onSubmit={(event) => submitHandler(event)}>
          <div className="brand">
            {/* <img src={logo} alt=""></img> */}
            <h1>Start Setup</h1>
          </div>
          <input type="text" placeholder="Username or Email" value={username} name="username" onChange={usernamechangehandler}></input>
          {/* <input type="text" placeholder="email" name="email" onChange={emailchangehandler}></input> */}
          <input type="password" placeholder="Password" name="password" value={password} onChange={passwordchangehandler}></input>
          {/* <input type="password" placeholder="confirmPassword" name="password" onChange={confirmpasswordchangehandler}></input> */}
          <button type="submit">Login</button>
          <span>
            Dont have an account ? <Link to="/register">Sign Up</Link>

          </span>
        </form>
      </FormContainer>
      <ToastContainer> </ToastContainer>
    </>
  )
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Login;