import {useWeb3Context} from "../../../context/Web3Provider.jsx";

export default function EmergencyStopVoting() {
   const {web3State} = useWeb3Context()
   const {contractInstance} = web3State;

   const emergencyStop = async () => {
      await contractInstance.emergencyStopVoting()
   }

   return <button onClick={emergencyStop}>Stop voting</button>
}