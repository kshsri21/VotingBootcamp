import { useEffect } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";

const GetCandidateList =  ()=>{
  const {contractInstance} = useWeb3Context()
  
  useEffect(()=>{
    const fetchCandidateList = async()=>{
      try{
        const candidateList = await contractInstance.getCandidateList();
        console.log(candidateList)
      }catch(error){
        console.error(error)
      }
    }
    contractInstance && fetchCandidateList()
  },[contractInstance])
  return(<>
  </>)
}
export default GetCandidateList;

