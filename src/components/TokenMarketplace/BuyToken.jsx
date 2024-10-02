import { ethers } from "ethers";
import { useRef } from "react";
import {toast} from "react-hot-toast"
const BuyToken = ({contractInstance}) => {
    const tokenAmountRef = useRef()
    const buyToken = async(e)=>{
      try{
        e.preventDefault()
        const tokenValueEth = tokenAmountRef.current.value;
        const tokenValueWei = ethers.parseEther(tokenValueEth,18);
        const tx = await contractInstance.buyGLDToken(tokenValueWei,{ gasLimit: 300000 })
        const reciept = tx.wait()
        console.log("Transaction Successful")
      }catch(error){
        toast.error("Error: Buy Token")
        console.error(error)
      }
    }
    return ( <>
    <form onSubmit={buyToken}>
      <label>Token Amount To Buy(In Eth):</label>
      <input type="text" ref={tokenAmountRef}></input>
      <button type="submit">Buy Token</button>
    </form>
    </>);
}
 
export default BuyToken;