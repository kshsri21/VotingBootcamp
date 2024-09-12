import { useEffect, useState } from "react";
import { Web3Context } from "./web3Context";
import { getWeb3State } from "../utils/getWeb3State";
import { handleAccountChange } from "../utils/handleAccountChange";
import { handleChainChange } from "../utils/handleChainChange";

const Web3Provider = ({children})=>{
  const [web3State,setWeb3State]=useState({
    contractInstance:null,
    selectedAccount:null,
    chainId:null
  })
  const handleWallet = async()=>{
    try{
        const {contractInstance,selectedAccount,chainId} = await getWeb3State();
        setWeb3State({contractInstance,selectedAccount,chainId})
    }catch(error){
        console.error(error)
    }
  }
  useEffect(()=>{
    window.ethereum.on('accountsChanged',()=>handleAccountChange(setWeb3State))
    window.ethereum.on('chainChanged',()=>handleChainChange(setWeb3State))

    return()=>{
        window.ethereum.removeListener('accountsChanged',()=>handleAccountChange(setWeb3State))
        window.ethereum.removeListener('chainChanged',()=>handleChainChange(setWeb3State))
    }
  },[])
  
  return (
    <> 
      <Web3Context.Provider value={web3State}>
        {children}
      </Web3Context.Provider>
      <button onClick={handleWallet}>Connect Wallet</button>
    </>
  )
}
export default Web3Provider;