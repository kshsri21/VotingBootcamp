import { useEffect } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GetVoterList.css"

const GetVoterList =  ()=>{
  const {web3State} = useWeb3Context()
  const {contractInstance} = web3State;
  const [voterList,setvoterList] = useState([])
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
        const VoterList = await contractInstance.getVoterList();
        setvoterList(VoterList)
      }catch(error){
        console.error(error)
      }
    }
    contractInstance && fetchVoterList()
  },[contractInstance])

  return ( <div className="voter-list-table-container">
    {voterList.length!==0?(<table className="voter-list-table">
        <thead>
            <tr>
            <th className="voter-list-table-header">Address</th>
                <th className="voter-list-table-header">Name</th>
                <th className="voter-list-table-header">Age</th>
                <th className="voter-list-table-header">Photo</th>
            </tr>
        </thead>
        <tbody>
            {voterList.map((voter, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                    <td className="voter-list-table-data">{voter.voterAddress}</td>
                    <td className="voter-list-table-data">{voter.name}</td>
                    <td className="voter-list-table-data">{voter.age}</td>
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
    </table>):(<p>No Voters Found!</p>)}
</div>);
}
export default GetVoterList;