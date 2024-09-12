import { useContext } from "react";
import { Web3Context } from "./context/web3Context";
const Dummy = ()=>{
  const {contractInstance,selectedAccount,chainId} = useContext(Web3Context);
  console.log(contractInstance,selectedAccount,chainId)
  return <h1>Dummy Component</h1>
}
export default Dummy;