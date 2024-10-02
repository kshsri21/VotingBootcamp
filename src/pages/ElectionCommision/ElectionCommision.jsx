import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnnounceWinner from "../../components/ElectionCommision/AnnounceWinner";
import DisplayResult from "../../components/ElectionCommision/DisplayResult"
import EmergencyDeclare from "../../components/ElectionCommision/EmergencyDeclare";
import VotingStatus from "../../components/ElectionCommision/VotingStatus"
import VotingTimePeriod from "../../components/ElectionCommision/VotingTimePeriod"
import {toast} from "react-hot-toast"

const ElectionCommision = ()=>{
  const token = localStorage.getItem("token")
    const navigateTo = useNavigate()
    useEffect(()=>{
      if(!token){
        navigateTo("/")
      }
    },[navigateTo,token])
  return(
    <>
     <VotingStatus/>
     <br></br>
     <DisplayResult/>
     <br></br>
     <VotingTimePeriod/> 
     <br></br>
     <AnnounceWinner/>
     <br></br>
     <EmergencyDeclare/>
    </>
  )
}
export default ElectionCommision;