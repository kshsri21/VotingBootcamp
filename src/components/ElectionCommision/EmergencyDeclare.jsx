import {useWeb3Context} from "../../../context/Web3Provider.jsx";

export default function EmergencyStopVoting() {
   const {contractInstance} = useWeb3Context()

   const emergencyStop = async () => {
      await contractInstance.emergencyStopVoting()
   }

   return <button onClick={emergencyStop}>Stop voting</button>
}