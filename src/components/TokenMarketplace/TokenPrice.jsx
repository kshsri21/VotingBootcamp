import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {toast} from "react-hot-toast"
const TokenPrice = ({contractInstance}) => {
   const [tokenPrice,setTokenPrice]=useState(null)
    useEffect(()=>{
     try{
         const fetchTokenPrice = async()=>{
            const tokenPriceWei = await contractInstance.tokenPrice();
            const tokenPriceEth = ethers.formatEther(tokenPriceWei)
            setTokenPrice(tokenPriceEth)
         }
         contractInstance && fetchTokenPrice()
         
        }catch(error){
            toast.error("Error: Fetching Token Price")
            console.error(error)
        }
        
    },[contractInstance])
    return ( <>Token Price: {tokenPrice} eth</> );
}
 
export default TokenPrice;