import { useRef } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import {toast} from "react-hot-toast"
const castVote = ()=>{
  const {web3State} = useWeb3Context()
  const {contractInstance} = web3State;
  const voterIdRef = useRef(null);
  const candidateIdRef = useRef(null);

  const voteCandidate=async(e)=>{
      try{
        e.preventDefault();
        const voterId = voterIdRef.current.value;
        const candidateId = candidateIdRef.current.value;
        await contractInstance.castVote(voterId,candidateId)
      }catch(error){
        toast.error("Error: Casting Vote")
        console.error(error)
      }
  }
  return(<>
    <form onSubmit={voteCandidate}>
        <label>Voter Id:
            <input type="date" ref={voterIdRef}></input>
        </label>
        <label>Candidate ID:
            <input type="date" ref={candidateIdRef}></input>
        </label>
        
        <button type="submit">Cast Vote </button>
    </form>
  </>)
}
export default castVote;