import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../redux/store";
import toast from "react-hot-toast";


const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const [value, setValue] = useState();

  //logout
  const handleLogout = () => {
    try {
      dispatch(auth.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <AppBar position='sticky'>
        <Toolbar>
            <Typography variant='h4' fontFamily={'Khula'} color="#7AB7A8"> 
                The Hungry Panda Blog
            </Typography>
            { isLogin && ( //rendering condition if a user is logged in
                <Box display={'flex'} marginLeft='auto' marginRight={'auto'}>
                    <Tabs textColor='inherit' value={value} onChange={(evt, value) => setValue(value) }>
                        <Tab label="Posts" LinkComponent={Link} to="/posts" />
                        <Tab label="My Posts" LinkComponent={Link} to="/my-posts" />
                    </Tabs>
                </Box>
            )}
            <Box id='navbar' display={'flex'} marginLeft="auto">
                {!isLogin && (
                    <>
                        <Button sx={{margin:1, color: "white" }} LinkComponent={ Link } to="/login">Login</Button>
                        <Button sx={{margin:1, color: "white" }} LinkComponent={ Link } to="/register">Register</Button>
                    </>
                )}
                {isLogin && (
                    <Button onClick={handleLogout} sx={{margin:1, color: "white" }}>Logout</Button>
                )}
            </Box>
        </Toolbar>

    </AppBar>

        
    </>
  )
}

export default Header