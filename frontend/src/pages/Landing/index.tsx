import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Background from '../../assets/back.png'
import logo from '../../assets/logo.png'
import { Navigate } from 'react-router-dom';
import { getJWTToken } from "../../utils/helper";



import {  Card, CardContent } from "@mui/material";



  
import { useState } from "react";
import { postData } from "../../services/axios.service";
import { errorToast, successToast } from "../../services/toastify.service";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import SignInWithGoogle from '../../components/SignIn';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();



 

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Home', 'Login', 'Signup'];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MEONSITY E-Learning
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  
  
  const navigate = useNavigate();
  const handleRegisterClick =(event:any) => {
    event.preventDefault();
    // const token = await getToken(messaging, {
    //   vapidKey: import.meta.env.VITE_FIREBASE_VALID_KEY,
    // });
    navigate("/signup");
    
    };
    const handleloginClick =(event:any) => {
      event.preventDefault();
      // const token = await getToken(messaging, {
      //   vapidKey: import.meta.env.VITE_FIREBASE_VALID_KEY,
      // });
      navigate("/signin");
      
      };
  
  return (
    
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
              MEONSITY E-Learning
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      <>




      
  <div className='
bg-indigo-300  bg-opacity-20'>
  <div className='flex' >

 <div>

 
  <div className='flex '>
  <h1 className=' m-20  font-bold text-6xl   text-gray-800'>Hello <span className='text-sm '>👋</span> welcome to <span className='  text-orange-600'> Meonsity </span> E-learning webapplication </h1>
    
  </div>
  <div className=' text-left -mt-9    ml-20'>
    <p >Study any topic, anytime. Explore online courses for the <br />lowest price ever!</p>
  </div>
  <div >
    <button className=' mt-20 ml-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-9  rounded-md m-5'  onClick={handleRegisterClick} > Register </button>  
    <button className=' mt-20 ml-30 border-2 text-black border-green-600 hover:bg-green-700 hover:text-white font-bold py-2 px-9 rounded-md m-5'onClick={handleloginClick}> Login </button>
  </div>
      
     </div> 
      <div>
   <img  src={Background} alt="Background" style={{ height: '80vh', width: '100vw' }}/>

      </div>
  </div>

      </div>

<div className=' bg-indigo-100 rounded-lg py-8'>
    <div className=' ml-20 mt-50'>
      <div className='font-bold mt-20 font-sans  text-lg'>Popular Courses</div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 mr-20">
        
              <Card  className="flex flex-col h-full">
                <CardContent className="flex-grow">
                  <Typography variant="h5" component="h2" className="mb-2">
                   Title
                  </Typography>
                  <Typography variant="body2" color={"textSecondary"}>
                    Discription
                  </Typography>
                  <div className="mt-auto">
                    <Typography variant="body2" color={"textSecondary"}>
                      Instructor: 
                    </Typography>
                    <Typography variant="body2" color={"textSecondary"}>
                      Price: 
                    </Typography>
                    <Typography variant="body2" color={"textSecondary"}>
                      Duration:  weeks
                    </Typography>
                    <Button
                        variant="text"
                        onClick={handleRegisterClick}
                      >
                        Add to cart
                      </Button>
                  
                  </div>
                </CardContent>
              </Card>
              <Card  className="flex flex-col h-full">
                <CardContent className="flex-grow">
                  <Typography variant="h5" component="h2" className="mb-2">
                   Title
                  </Typography>
                  <Typography variant="body2" color={"textSecondary"}>
                    Discription
                  </Typography>
                  <div className="mt-auto">
                    <Typography variant="body2" color={"textSecondary"}>
                      Instructor: 
                    </Typography>
                    <Typography variant="body2" color={"textSecondary"}>
                      Price: 
                    </Typography>
                    <Typography variant="body2" color={"textSecondary"}>
                      Duration:  weeks
                    </Typography>
                    <Button
                        variant="text"
                        // onClick={(e) => handleAddToCart(course)}
                      >
                        Add to cart
                      </Button>
                  
                  </div>
                </CardContent>
              </Card>


              <Card  className="flex flex-col h-full">
                <CardContent className="flex-grow">
                  <Typography variant="h5" component="h2" className="mb-2">
                   Title
                  </Typography>
                  <Typography variant="body2" color={"textSecondary"}>
                    Discription
                  </Typography>
                  <div className="mt-auto">
                    <Typography variant="body2" color={"textSecondary"}>
                      Instructor: 
                    </Typography>
                    <Typography variant="body2" color={"textSecondary"}>
                      Price: 
                    </Typography>
                    <Typography variant="body2" color={"textSecondary"}>
                      Duration:  weeks
                    </Typography>
                    <Button
                        variant="text"
                        // onClick={(e) => handleAddToCart(course)}
                      >
                        Add to cart
                      </Button>
                  
                  </div>
                </CardContent>
              </Card>     
              
       
         
      </div>

    </div>

    <div className=' ml-20 mt-50'>
      <div className='font-bold mt-20 font-sans  text-lg'>Latest Courses</div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 mr-20">
        
    <Card  className="flex flex-col h-full">
                <CardContent className="flex-grow">
                  <Typography variant="h5" component="h2" className="mb-2">
                   Title
                  </Typography>
                  <Typography variant="body2" color={"textSecondary"}>
                    Discription
                  </Typography>
                  <div className="mt-auto">
                    <Typography variant="body2" color={"textSecondary"}>
                      Instructor: 
                    </Typography>
                    <Typography variant="body2" color={"textSecondary"}>
                      Price: 
                    </Typography>
                    <Typography variant="body2" color={"textSecondary"}>
                      Duration:  weeks
                    </Typography>
                    <Button
                        variant="text"
                        // onClick={(e) => handleAddToCart(course)}
                      >
                        Add to cart
                      </Button>
                  
                  </div>
                </CardContent>
              </Card>
              <Card  className="flex flex-col h-full">
                <CardContent className="flex-grow">
                  <Typography variant="h5" component="h2" className="mb-2">
                   Title
                  </Typography>
                  <Typography variant="body2" color={"textSecondary"}>
                    Discription
                  </Typography>
                  <div className="mt-auto">
                    <Typography variant="body2" color={"textSecondary"}>
                      Instructor: 
                    </Typography>
                    <Typography variant="body2" color={"textSecondary"}>
                      Price: 
                    </Typography>
                    <Typography variant="body2" color={"textSecondary"}>
                      Duration:  weeks
                    </Typography>
                    <Button
                        variant="text"
                        // onClick={(e) => handleAddToCart(course)}
                      >
                        Add to cart
                      </Button>
                  
                  </div>
                </CardContent>
              </Card>
              <Card  className="flex flex-col h-full">
                <CardContent className="flex-grow">
                  <Typography variant="h5" component="h2" className="mb-2">
                   Title
                  </Typography>
                  <Typography variant="body2" color={"textSecondary"}>
                    Discription
                  </Typography>
                  <div className="mt-auto">
                    <Typography variant="body2" color={"textSecondary"}>
                      Instructor: 
                    </Typography>
                    <Typography variant="body2" color={"textSecondary"}>
                      Price: 
                    </Typography>
                    <Typography variant="body2" color={"textSecondary"}>
                      Duration:  weeks
                    </Typography>
                    <Button
                        variant="text"
                        // onClick={(e) => handleAddToCart(course)}
                      >
                        Add to cart
                      </Button>
                  
                  </div>
                </CardContent>
              </Card>

              
              
       
         
      </div>

    </div>
    </div>

<div>
<>


<footer className="bg-white dark:bg-gray-600  rounded-lg mt-20">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
              <a href="#" className="flex items-center">
                  <img src={logo} className="h-8 me-3" alt="Meonsity Logo" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Meonsity</span>
              </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Links</h2>
                  <ul className="text-white  font-medium">
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Home</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline">Courses</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                  <ul className="text-white font-medium">
                      <li className="mb-4">
                          <a href="#" className="hover:underline ">Facebook</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline">Youtube</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                  <ul className="text-white font-medium">
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Privacy Policy</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white sm:text-center dark:text-gray-400">© 2023 <a href="#" className="hover:underline">Meonsity™</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a href="#" className="text-white hover:text-gray-900 dark:hover:text-white">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="#" fill="currentColor" viewBox="0 0 8 19">
                        <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                    </svg>
                  <span className="sr-only">Facebook page</span>
              </a>
              <a href="#" className="text-white hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="#" fill="currentColor" viewBox="0 0 21 16">
                        <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
                    </svg>
                  <span className="sr-only">Discord community</span>
              </a>
              <a href="#" className="text-white hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="#" fill="currentColor" viewBox="0 0 20 17">
                    <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>
                </svg>
                  <span className="sr-only">Twitter page</span>
              </a>
              <a href="#" className="text-white hover:text-gray-900 dark:hover:text-white ms-5">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="#" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                  </svg>
                  <span className="sr-only">GitHub account</span>
              </a>
           
          </div>
      </div>
    </div>
</footer>

</>
</div>
      </>
      </Box>
    </Box>
  );
}