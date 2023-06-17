import './Home.css';
import { Canvas } from '@react-three/fiber';
import Box from '../components/Prop';
import { OrbitControls ,Stars} from '@react-three/drei';
import { Button, Card, List, Typography } from '@mui/material';
import Atom from '../components/Atom';
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/Authcontext';
import { useEffect } from 'react';

function Home(){
  const {logOut, user} = UserAuth();
  const navigate = useNavigate();
  useEffect(()=>
  {
    if(user==null)
    navigate('/')  
  },[user])

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
    <>
    <div style={{ height: '100vh', backgroundColor: 'black'}}>
      <Canvas>
        <OrbitControls />
        <Stars />
        <ambientLight />
        <spotLight position={[10,15,10]} angle={0.3} />
        <Box />
        <Atom />
        
      </Canvas>
      <div id='text'>
      <h1></h1>
      </div>
      <div id='overlay'>
        <Button variant='contained' color='secondary' id='wallet'>
          Connect your wallet
        </Button>
      
        <Card id='card' sx={{backgroundColor: '#121212', borderRadius:'2%', opacity:'85%'}}>
          <Typography variant="h2" align='center' sx={{ m:'10px', color: 'white'}}>
            A new way to identify
          </Typography>
          <Typography variant="h5" align='center' sx={{ m: '20px', color: 'rebeccapurple'}}>
            Mint your unique non fungible token using any of the following
          </Typography>
          <div id='list'>
          <List>
            <Button variant='contained' color='secondary' sx={{width: '85%', marginTop:'20px'}}>
              Adhaar
            </Button>
            <Button variant='contained' color='secondary' sx={{width: '85%', marginTop:'20px'}}>
              PAN
            </Button>
            <Button variant='contained' color='secondary' sx={{width: '85%', marginTop:'20px'}}>
              Driver's License
            </Button>
          </List>
          </div>
          
        </Card>

        <Button variant='contained' color='secondary' onClick={handleLogout} sx={{marginTop:'15px'}} >
          LogOut
        </Button>
      </div>

    </div>
    
    </>
  
    
  );

  }
export default Home;
