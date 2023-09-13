import { 
    AppBar, 
    Box, 
    Toolbar, 
    Button, 
    Typography, 
    Tabs, 
    Tab  } from '@mui/material'
import React, {useState} from 'react'
import { Link } from 'react-router-dom' //creating the links to be followed when clicking
import { useSelector } from 'react-redux'


const Header = () => {
    //global state
    const isLogin = useSelector(state => state.isLogin);
    console.log(isLogin)
    
    //state
    const [value, setvalue] = useState()

  return (
    <>
    <AppBar position='sticky'>
        <Toolbar>
            <Typography variant='h4' > 
                The Hungry Panda Blog
            </Typography>
            { isLogin && ( //rendering condition if a user is logged in
                <Box display={'flex'} marginLeft='auto' marginRight={'auto'}>
                    <Tabs textColor='inherit' value={value} onChange={(evt, value) => setvalue(value) }>
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
                    <Button sx={{margin:1, color: "white" }}>Logout</Button>
                )}
            </Box>
        </Toolbar>

    </AppBar>

        
    </>
  )
}

export default Header