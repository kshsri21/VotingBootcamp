import { useRef } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import {toast} from "react-hot-toast"

const VotingTimePeriod = ()=>{
  const {web3State} = useWeb3Context()
  const {contractInstance} = web3State;
  
  const startRef = useRef(null);
  const endRef = useRef(null);
  const handleVotingTime=async(e)=>{
      try{
        e.preventDefault();
        const startTime = startRef.current.value;
        const endTime = endRef.current.value;
       
        console.log(startTime,endTime)
        // await contractInstance.setVotingPeriod(startTime,endTime)
        // console.log("Voter Time is set successful")
      }catch(error){
        toast.error("Error: Voting Time Period")
        console.error(error)
      }
  }
  return(<>
    <form onSubmit={handleVotingTime}>
        <label>Start Time:
            <input type="date" ref={startRef}></input>
        </label>
        <label>End Time:
            <input type="date" ref={endRef}></input>
        </label>
        
        <button type="submit">Register</button>
    </form>
  </>)
}
export default VotingTimePeriod;