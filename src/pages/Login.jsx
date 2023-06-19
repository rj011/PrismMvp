import React, { useEffect } from 'react'
import GoogleButton from 'react-google-button'
import './Login.css'
import { Box, Button, Card, Typography } from '@mui/material'
import { UserAuth } from '../context/Authcontext'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const {googleSignIn, user, logOut} = UserAuth();
  const navigate = useNavigate();
  useEffect(()=>
  {
    if(user!=null)
    console.log("hiii",user.currentUser.get().getBasicProfile())
    navigate('/Home')  
  },[user])

  const handleSignIn = async () =>
  {
    try{
      await googleSignIn()
    } catch(error){
      console.log(error)
    }
  };
  

  const handleLogout = async() =>
  {
    try{
      await logOut()
    }catch (error)
    {
      console.log(error)
    }
  }

  

  return (
    <div className='main'>
        <Box sx={{backgroundColor:'#121212', boxShadow: '10px 10px 10px indigo',height: '50vh', width:'50%', display:'block', borderRadius:'15px', padding:'10px'}}>
          <Typography variant = 'h1' sx={{color: 'rebeccapurple', display:'flex', justifyContent:'center', padding:'10px'}}>
            Welcome
          </Typography>
          <Typography variant = 'h4' sx={{color: 'white', display:'flex', justifyContent:'center', marginTop: '30px'}}>
            Please sign in with Google to proceed
          </Typography>
          {user?.displayName ? (
          <Button className='button' onClick={handleLogout} color='secondary' sx={{display:'flex', justifyContent:'center', marginTop:'20px', padding:'15px'}}>
          SignOut
        </Button>
          ) : (
            <Button className='button' onClick={handleSignIn} color='secondary' sx={{display:'flex', justifyContent:'center', marginTop:'20px', padding:'15px'}}>
            SignIn
          </Button>
          )}
          
        </Box>

        
        {/* Fetching data from token like this..... should be removed in the final build*/}
        <h1 style={{ color: 'white'}}>
          Sample data from token
          {user?.displayName}
        </h1>
      
        
        
        
    </div>
  )
}

export default Login