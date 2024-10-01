import { useEffect,useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { useNavigate } from "react-router-dom";
import "./GetVoterList.css"

const GetVoterList =  ()=>{
  const {web3State} = useWeb3Context()
  const {contractInstance} = web3State;
  const [voterList,setVoterList] = useState([])
  const token = localStorage.getItem("token")
  const navigateTo = useNavigate()
  
  useEffect(()=>{
    if(!token){
      navigateTo("/")
    }
  },[navigateTo,token])
  
  useEffect(()=>{
    const fetchVoterList = async()=>{
      try{
        const voterList = await contractInstance.getVoterList();
        setVoterList(voterList)
        // console.log(voterList)
      }catch(error){
        console.error(error)
      }
    }
    contractInstance && fetchVoterList()
  },[contractInstance])
  return(<>
        <div  className="voter-list-table-container">
          {voterList.length!==0?(<table className="voter-list-table">
        <thead>
            <tr>
            <th className="voter-list-table-header">Address</th>
                <th className="voter-list-table-header">Name</th>
                <th className="voter-list-table-header">Age</th>
                <th className="voter-list-table-header">Gender</th>
                <th className="voter-list-table-header">ID</th>
            </tr>
        </thead>
        <tbody>
            {voterList.map((voter, index) => (
                <tr key={index}>
                    <td className="voter-list-table-data">{voter.voterAddress}</td>
                    <td className="voter-list-table-data">{voter.name}</td>
                    <td className="voter-list-table-data">{String(voter.age)}</td>
                    <td className="voter-list-table-data">{voter.gender}</td>
                    <td className="voter-list-table-data">{String(voter.voteCandidateId)}</td>
                    <td className="voter-list-table-data">  
                      <img 
                       width={"70px"} 
                       height={"70px"} 
                       src={`http://localhost:3000/images/VoterImages/${voter.voterAddress}.png`}
                      />      
                    </td>
                </tr>
            ))}
        </tbody>
    </table>):(<p>No voters Found!</p>)}
        </div>
  </>)
}
export default GetVoterList;