import { useEffect } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { useState } from "react";

const GetCandidateList =  ()=>{
  const {web3State} = useWeb3Context()
  const {contractInstance} = web3State;
  const [candidateList,setCandidateList] = useState([])
  useEffect(()=>{
    const fetchCandidateList = async()=>{
      try{
        const candidateList = await contractInstance.getCandidateList();
        setCandidateList(candidateList)
        console.log(candidateList)
      }catch(error){
        console.error(error)
      }
    }
    contractInstance && fetchCandidateList()
  },[contractInstance])
  return(<>
   <ul>
{candidateList.map((candidateList, index) => (
  <li key={index}>
    Name: {candidateList.name}, 
    party: {candidateList.party}, 
    Age: {candidateList.age.toString()},
    Votes: {candidateList.votes.toString()}
  </li>
))}
</ul>
  </>)
}
export default GetCandidateList;

