import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {  
  Box, 
  Typography, 
  TextField, 
  Button } from '@mui/material';
import axios from "axios";
  



export const Register = () => {
  //handels navigate to another route
  const navigate = useNavigate();
  //set initial state for input values
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

//handle input change
  const handleChange = (e) => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
 
 //Password validation
 const validatePassword = (password) => {
  // Password must be at least 6 characters long
  return password.length >= 6;
}

  //form handle
  const handleSubmit = async(e) => {
    //preventing to re rendering 
    e.preventDefault()
   //storagin the valid password on a variable
    const isValidPassword = validatePassword(inputs.password);
    if (!isValidPassword) {
      alert("Password must be at least 6 characters long.");
      return; // Exit early if password is invalid
    }
    if (inputs.password !== inputs.confirmPassword) {
      alert("Passwords do not match.");
      return; // Exit early if passwords don't match
    }
    try {
      const response = await axios.post('/api/user/register', {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password
      });
  
      if (response.data.success) {
        alert("User Registered Successfully");
        navigate("/login")
      } else {
        alert("User registration failed. Please try again later.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while registering. Please try again later.");
    }
  };

 
  return (
    <>
    <form onSubmit={handleSubmit}>
      <Box maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={5}
          borderRadius={5}>
        <Typography variant="h3" padding={3} textAlign="center" fontFamily={'Khula'}> Register </Typography>
        <TextField
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            margin="normal"
            type={"text"}
            required
          />
        <TextField
            placeholder="email"
            value={inputs.email}
            onChange={handleChange}
            name="email"
            margin="normal"
            type={"email"}
            required
          />
        <TextField 
          placeholder='Password'
          value={inputs.password}
          onChange={handleChange}
          name="password" 
          margin="normal" 
          type={"password"} 
          required />
        <TextField
          placeholder='Confirm Password'
          value={inputs.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          margin="normal"
          type="password"
          required
        />    
        <Button type='usbmit' sx={{ borderRadius: 3, marginTop: 3}} variant="contained" color="secondary" >Submit</Button>
        <Button onClick={() => navigate('/login')} color="secondary"> Already Registered? Please Login</Button>
      </Box>
    </form>
    </>
  )
}

