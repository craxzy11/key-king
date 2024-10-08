import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const usernamechangehandler = (event) => {
    setUsername(event.target.value);
  }
  const emailchangehandler = (event) => {
    setEmail(event.target.value);
  }
  const passwordchangehandler = (event) => {
    setPassword(event.target.value);
  }
  const confirmpasswordchangehandler = (event) => {
    setConfirmPassword(event.target.value);
  }
  const handleValidation = () => {
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (userName.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (emailId === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(registerRoute, {
        userName,
        firstName: "afkjasf",
        lastName: "askdfj",
        emailId,
        password,
        isEmailVerified: false,
      })
      const data = response.data;
      if (data.success) {
        toast.success("Registration Succesfull", toastOptions);
        navigate("/login");
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
            <h1>Start project</h1>
          </div>
          <input type="text" placeholder="Enter a unique userName" value={userName} name="username" onChange={usernamechangehandler}></input>
          <input type="text" placeholder="email" name="email" value={emailId} onChange={emailchangehandler}></input>
          <input type="password" placeholder="password" name="password" onChange={passwordchangehandler}></input>
          <input type="password" placeholder="confirmPassword" name="password" onChange={confirmpasswordchangehandler}></input>
          <button type="submit">Create User</button>
          <span>
            Alreday have an account ? <Link to="/login">Login</Link>

          </span>
        </form>
      </FormContainer>
      <ToastContainer></ToastContainer>
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
export default Register;