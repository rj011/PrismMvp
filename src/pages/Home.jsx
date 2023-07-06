import './Home.css';
import React from "react";
import { Canvas } from '@react-three/fiber';
import Box from '../components/Prop';
import { OrbitControls, Stars } from '@react-three/drei';
import { Button, Card, List, Typography } from '@mui/material';
import Atom from '../components/Atom';
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/Authcontext';
import { useEffect } from 'react';
import { ConnectKitButton } from "connectkit"
import zkpVaultABI from "../zkVault.json"
import Lottie from 'react-lottie';
import animationData from '../lottie/99630-tick.json'
import {
  useAccount,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractWrite,
  useContractRead,
} from "wagmi";


const snarkjs = window.snarkjs;

function Home() {

  const [getCallData, setCallData] = React.useState({})
  const { address, isConnected } = useAccount();
  const [isgenerateProofClicked, setisGenerateProofClicked] = React. useState(false)
  const [isClicked, setisClicked] = React.useState(false)
  const [isCredSelected, setisCredSelected] = React.useState(false)
  const [clickedButtons, setClickedButtons] = React.useState([])

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const handleClick = (buttonIndex) => {
    const newClickedButtons = [...clickedButtons];
    newClickedButtons[buttonIndex] = !newClickedButtons[buttonIndex];
    setClickedButtons(newClickedButtons);
  };

  const zkpVaultContractConfig = {
    address: "0xa2594512a75a09218e4d5a84365ad272a48d9699",
    abi: zkpVaultABI.abi,
    chainId: 11155111,
  };


  const totalSupplyData = useContractRead({
    ...zkpVaultContractConfig,
    functionName: "totalSBT",
    watch: true,
  });


  React.useEffect(() => {
    if (totalSupplyData) {
      console.log("Total Supply:", totalSupplyData);
    }
  }, [totalSupplyData]);


  const hasSoul = useContractRead({
    ...zkpVaultContractConfig,
    functionName: "hasSoul",
    watch: true,
    args: [address],
  });

  React.useEffect(() => {
    console.log("hasSoul:", hasSoul);

  }, [hasSoul]);


  const sbtData = useContractRead({
    ...zkpVaultContractConfig,
    functionName: "getSBTData",
    watch: true,
    args: [address],
  });



  React.useEffect(() => {
    if (sbtData) {
      console.log("SBT-Data:", getCallData);
    }
  }, [sbtData]);

  const zkpVaultMintConfig = usePrepareContractWrite({
    ...zkpVaultContractConfig,
    functionName: "mint",
    args: [getCallData.a, getCallData.b, getCallData.c, getCallData.Input],
  });
/* global BigInt */

  const { data, write } = useContractWrite({
    ...zkpVaultContractConfig,
    functionName: "mint",
    args: [getCallData.a, getCallData.b, getCallData.c, getCallData.Input],
  })

  React.useEffect(() => {
    console.log("Data:", data);
  }, [data]);


  async function calculateProof() {

    navigate('/Verification')

    const input = { age: 19, citizenship: 91, cibil: 120 }

    const { proof, publicSignals } =
      await snarkjs.groth16.fullProve(input, "http://localhost:8000/aadharCheck.wasm", "http://localhost:8000/aadharCheck.zkey");
    console.log(proof);
    console.log(publicSignals);

    const callData = await snarkjs.groth16.exportSolidityCallData(
      proof,
      publicSignals
    )
    const argv = callData
      .replace(/["[\]\s]/g, "")
      .split(",")
      .map((x) => BigInt(x).toString());
    const a = [argv[0], argv[1]];
    const b = [
      [argv[2], argv[3]],
      [argv[4], argv[5]],
    ];
    const c = [argv[6], argv[7]];
    const Input = [];


    for (let i = 8; i < argv.length; i++) {
      Input.push(argv[i]);
    }

    Input.push(1)


    setCallData({ a, b, c, Input })

    console.log(proof);
    const vkey = await fetch("http://localhost:8000/aadharCheck.vkey.json").then(function (res) {
      return res.json();
    });
    const res = await snarkjs.groth16.verify(vkey, ['1'], proof);
    console.log("Result:", res);

  }

  const { googleSignIn, user, logOut } = UserAuth();
  useEffect(() => {
    if (user != null)
      console.log("UserName:", user.displayName)
  }, [user])

  const handleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  };

  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  //var select = 'CHOOSE';

  return (
    <>
      <div style={{ height: '100vh', backgroundColor: 'black' }}>
        <Canvas>
          <OrbitControls />
          <Stars />
          <ambientLight />
          <spotLight position={[10, 15, 10]} angle={0.3} />
          <Box />
          <Atom />

        </Canvas>
        
        <div style={{ position: 'absolute', top: 24, right: 24, display: 'flex' }}>
          {
            isCredSelected && (
        <Lottie 
	    options={defaultOptions}
        height={40}
        width={40}
      />
          )}
          <ConnectKitButton />
          
        </div>


        {
         

         isConnected && isgenerateProofClicked && (
           <>
           <div style={{display: 'flex',
         justifyContent: 'space-between',
         position: 'absolute',
         width: '100%',
         top: '20%',
        right:'1%'}}>

           <Card sx={{ display: 'block',
         justifyContent: 'center',
         position: 'absolute',
         top: '25%',
         right: '10%',
         marginLeft:'30px',
         zIndex:'200',
          width:'260px',
         backgroundColor: '#121212', borderRadius: '2%', opacity: '100%',
         height:'50vh', padding:'15px'
         }}>
             <Typography variant="h5" align='center' sx={{ m: '20px', color: 'white' }}>
             ALICE
           </Typography>
           <br/>
           <Typography variant="h5" align='center' sx={{ m: '10px', color: 'rebeccapurple' }}>
             Age: 21
           </Typography>
           <Typography variant="h5" align='center' sx={{ m:'10px', color: 'rebeccapurple' }}>
             CIBIL: 98
           </Typography>
           <Typography variant="h5" align='center' sx={{  color: 'rebeccapurple' }}>
             Nationality: IND
           </Typography>
           <Button variant='outlined' color='secondary' sx={{ width: '85%', margin: '10px'}} onClick={()=> {setisGenerateProofClicked(!isgenerateProofClicked);  setisClicked(!isClicked); setisCredSelected(!isCredSelected); handleClick(0) }}>
            {clickedButtons[0] ? 'Drop' : 'Choose'}
           </Button>
           </Card>

           <Card sx={{ display: 'block',
         justifyContent: 'center',
         position: 'absolute',
         top: '25%',
         right: '35%',
         backgroundColor: '#121212', borderRadius: '2%', opacity: '100%',
         zIndex:'200',
         width:'260px',
         height:'50vh', padding:'15px'
         }}>
             <Typography variant="h5" align='center' sx={{ m: '20px', color: 'white' }}>
             BOB
           </Typography>
           <br/>
           <Typography variant="h5" align='center' sx={{ m: '10px', color: 'rebeccapurple' }}>
             Age: 32
           </Typography>
           <Typography variant="h5" align='center' sx={{ m: '10px', color: 'rebeccapurple' }}>
             CIBIL: 56
           </Typography>
           <Typography variant="h5" align='center' sx={{ color: 'rebeccapurple' }}>
             Nationality: AUS
           </Typography>
           
           <Button variant='outlined' color='secondary' sx={{ width: '85%', margin: '10px'}} onClick={()=> {setisGenerateProofClicked(!isgenerateProofClicked);  setisClicked(!isClicked); setisCredSelected(!isCredSelected); handleClick(1);}}>
             {clickedButtons[1] ? 'Drop' : 'Choose'}
           </Button>
           </Card>

           
           </div>
           
           </>
         )}

        
        
        <div id='overlay'>

          <Card id='card' sx={{ backgroundColor: '#121212', borderRadius: '2%', opacity: '85%' }}>
            <Typography variant="h2" align='center' sx={{ m: '10px', color: 'white' }}>
              A new way to identify
            </Typography>
            <Typography variant="h5" align='center' sx={{ m: '20px', color: 'rebeccapurple' }}>
              Mint a unique non fungible token to generate your decentralised SSI 
            </Typography>
            <div id='list'>
              <List>
                <Button onClick={handleSignIn} variant='contained' color='secondary' sx={{ width: '85%', marginTop: '20px' }}>
                  GSignIn
                </Button>
                <Button onClick={()=> {navigate('/Verification');}} variant='contained' color='secondary' sx={{ width: '85%', marginTop: '20px' }}>
                  Issuance + Verification
                </Button>
                <Button onClick={() => setisGenerateProofClicked(!isgenerateProofClicked)} variant='contained' color='secondary' sx={{ width: '85%', marginTop: '20px' }}>
                  Generate Proof
                </Button>
                <Button onClick={() => { write() }} disabled={isClicked===false} variant='contained' color='secondary' sx={{ width: '85%', marginTop: '20px' }}>
                  Mint
                </Button>
              </List>
            </div>

          </Card>
          

          <Button onClick={handleLogout} variant='contained' color='secondary' sx={{ marginTop: '15px' }} >
            LogOut
          </Button>
        </div>

      </div>

      {/* if (Object.keys(getCallData).length !== 0) {
      mint?.();
    }  */}

    </>


  );

}
export default Home;
