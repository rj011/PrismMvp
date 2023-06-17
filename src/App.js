import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import { Authcontextprovider } from './context/Authcontext';
import Login from './pages/Login';

function App(){
  

  return (
    <>
    <Authcontextprovider>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path = '/Home' element={<Home />} />
      </Routes>
    
    </Authcontextprovider>
   
    </>
  );
  }
export default App;
