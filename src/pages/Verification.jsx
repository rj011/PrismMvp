import React from 'react'
import { Canvas } from '@react-three/fiber'
import Particle from '../components/Particle'
import { Card, Typography } from '@mui/material'
import Lottie from 'react-lottie'
import animationdata from '../lottie/118002-warning.json'
import './Verification.css'
const Verification = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationdata,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <>
    <div className='container' style={{display:'flex'}}>
    <div style={{backgroundColor:'black',flex:1,height:'100vh'}}>
    <Canvas camera={{position:[0,0,6]}}>
    <Particle />
    </Canvas>
    
    </div>
    <div style={{backgroundColor:'black',flex:1,display:'flex',alignItems:'center',justifyContent:'center'}}>
    <div className='card-container' style={{padding:'20px',display:'block',justifyContent:'center',alignItems:'center',marginTop:'20px'}}>
      <Lottie 
      options={defaultOptions}
      height={80}
      width={80} />
      <Typography variant='h2' align='center' sx={{color:'rebeccapurple'}}>
        User is not verified
      </Typography>
    
    </div>
  </div>
  </div>
  </>
    
  )
}

export default Verification