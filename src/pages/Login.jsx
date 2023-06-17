import React from 'react'
import GoogleButton from 'react-google-button'
import './Login.css'
import { Box, Card, Typography } from '@mui/material'
const Login = () => {
  return (
    <div className='main'>
        <Box sx={{backgroundColor:'#121212', boxShadow: '10px 10px 10px indigo',height: '50vh', width:'50%', display:'block', borderRadius:'15px', padding:'10px'}}>
          <Typography variant = 'h1' sx={{color: 'rebeccapurple', display:'flex', justifyContent:'center', padding:'10px'}}>
            Welcome
          </Typography>
          <Typography variant = 'h4' sx={{color: 'white', display:'flex', justifyContent:'center', marginTop: '30px'}}>
            Please sign in with Google to proceed
          </Typography>
          <GoogleButton className='button' />
        </Box>
      
        
        
        
    </div>
  )
}

export default Login