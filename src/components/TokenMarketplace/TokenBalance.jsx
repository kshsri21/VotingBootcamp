import {ethers}  from "ethers";

import { useEffect,useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import {toast} from "react-hot-toast"
const TokenBalance = ({erc20ContractInstance}) => {
    const {web3State}=useWeb3Context()
    const {selectedAccount}=web3State
    const [userTokenBalance,setUserTokenBalance]=useState("0")
    useEffect(()=>{
        const fetchTokenBalance = async()=>{
        try{
            const tokenBalanceWei = await erc20ContractInstance.balanceOf(selectedAccount)
            console.log(tokenBalanceWei)
            const tokenBalanceEth = ethers.formatEther(tokenBalanceWei)
            setUserTokenBalance(tokenBalanceEth)
        }catch(error){
            toast.error("Error: Getting Token Balance")
            console.error(error)
          }
        } 
        erc20ContractInstance && fetchTokenBalance()
    },[erc20ContractInstance,selectedAccount])
    return (<>Token Balance:{userTokenBalance}</>);
}
 
export default TokenBalance;