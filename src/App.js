import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import { Authcontextprovider } from './context/Authcontext';
import Login from './pages/Login';
import { WagmiConfig, createConfig, configureChains, mainnet, sepolia } from 'wagmi'
 
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { ConnectKitProvider } from "connectkit";


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [alchemyProvider({ apiKey: 'FucHSZeoIus8zjksFFjqvjNd-4Z68E-6' }), publicProvider()],
)
 
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '...',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})


function App(){
  

  return (
    <>
    <Authcontextprovider>
    <WagmiConfig config={config}>
    <ConnectKitProvider
        theme="nouns"
        customTheme={{
          "--ck-accent-color": "#58ADF7",
          "--ck-accent-text-color": "#ffffff",
          "--ck-border-radius": 42,
        }}
      >
      <Routes>
       
        {/* <Route path='/' element={<Login />} /> */}
        <Route path = '/' element={<Home />} />
      </Routes>
      </ConnectKitProvider>
      </WagmiConfig>
    
    </Authcontextprovider>
   
    </>
  );
  }
export default App;
