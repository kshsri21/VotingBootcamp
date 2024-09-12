import {ethers} from "ethers"
import abi from "../constant/abi.json"

export const getWeb3State = async()=>{
    try{
        //metamask installation check
        if(!window.ethereum){
            throw new Error("Metamask is not installed")
        }
        const accounts = await window.ethereum.request({
            method:'eth_requestAccounts'
        })
        const selectedAccount = accounts[0];

        const chainIdHex = await window.ethereum.request({
            method:'eth_chainId'
        })
        const chainId = parseInt(chainIdHex,16);
        const provdier = new ethers.BrowserProvider(window.ethereum)
        const signer = await provdier.getSigner()
        const contractAddress = "0xCCC15B5CCAF92d34f3A99c2270920D3Fcf42c290";

        const contractInstance = new ethers.Contract(contractAddress,abi,signer)
        return {contractInstance,selectedAccount,chainId}
    }catch(error){
        console.error(error)
        throw new Error
    }
  
} 