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


  const { data, isLoading, isSuccess, write } = useContractWrite(zkpVaultMintConfig)

  React.useEffect(() => {
    console.log("Data:", data);

  }, [data]);
  // const { isLoading, isSuccess } = useWaitForTransaction({
  //   hash: data?.hash,
  // })


  //   const {
  //   mintData,
  //   mint,
  //   isMintLoading,
  //   isMintStarted,
  //   mintError,
  // } = useContractWrite(zkpVaultMintConfig);

  // const {
  //   txData,
  //   txSuccess,
  //   txError,
  // } = useWaitForTransaction({
  //   hash: mintData?.hash,
  // });

  // const isMinted = txSuccess;

  async function calculateProof() {

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
        <div id='text'>
          <h1></h1>
        </div>
        <div style={{ position: 'absolute', top: 24, right: 24 }}>
          <ConnectKitButton />
        </div>
        <div id='overlay'>

          <Card id='card' sx={{ backgroundColor: '#121212', borderRadius: '2%', opacity: '85%' }}>
            <Typography variant="h2" align='center' sx={{ m: '10px', color: 'white' }}>
              A new way to identify
            </Typography>
            <Typography variant="h5" align='center' sx={{ m: '20px', color: 'rebeccapurple' }}>
              Mint your unique non fungible token using any of the following
            </Typography>
            <div id='list'>
              <List>
                <Button onClick={handleSignIn} variant='contained' color='secondary' sx={{ width: '85%', marginTop: '20px' }}>
                  GSignIn
                </Button>
                <Button onClick={calculateProof} variant='contained' color='secondary' sx={{ width: '85%', marginTop: '20px' }}>
                  Issuance + Verification
                </Button>
                <Button variant='contained' color='secondary' sx={{ width: '85%', marginTop: '20px' }}>
                  Generate Proof
                </Button>
                <Button onClick={() => { write() }} variant='contained' color='secondary' sx={{ width: '85%', marginTop: '20px' }}>
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
