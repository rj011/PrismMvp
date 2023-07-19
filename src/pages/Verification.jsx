import React from 'react'
import { Canvas } from '@react-three/fiber'
import Particle from '../components/Particle'
import { Card, Typography } from '@mui/material'
import Lottie from 'react-lottie'
import animationdata from '../lottie/118002-warning.json'
import { ConnectKitButton, useSIWE } from "connectkit"
import {
  useAccount,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractWrite,
  useContractRead,
} from "wagmi";

import './Verification.css'


const snarkjs = window.snarkjs;


const Verification = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationdata,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const { address, isConnected } = useAccount();

  async function verify() {
    const vkey = await fetch("http://localhost:8000/aadharCheck.vkey.json").then(function (res) {
      return res.json();
    });


    // const res = await snarkjs.groth16.verify(vkey, ['1'], getProof);
    // console.log("Result:", res);
  }
  React.useEffect(() => {

  }, [isConnected]);

  return (
    <>
      <div className='container' style={{ display: 'flex' }}>
        <div style={{ backgroundColor: 'black', flex: 1, height: '100vh' }}>
          <Canvas camera={{ position: [0, 0, 6] }}>
            <Particle />
          </Canvas>

        </div>
        <div style={{ backgroundColor: 'black', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className='card-container' style={{ padding: '20px', display: 'block', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Lottie
              options={defaultOptions}
              height={80}
              width={80} />
            <div style={{ position: 'absolute', top: 24, right: 24 }} >
              <ConnectKitButton />

            </div>

            <Typography variant='h2' align='center' sx={{ color: 'rebeccapurple' }}>
              User is not verified
            </Typography>

          </div>
        </div>
      </div>
    </>

  )
}

export default Verification