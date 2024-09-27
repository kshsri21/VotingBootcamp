import { useRef, useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import axios from "axios";
import { uploadCanidateImage } from "../../utils/uploadCanidateImage";
const RegisterCandidate = ()=>{
  const [file,setFile] = useState("")
  const {web3State} = useWeb3Context()
  const {contractInstance} = web3State;
  const nameRef = useRef(null);
  const genderRef = useRef(null);
  const partyRef = useRef(null);
  const ageRef = useRef(null);
  const handleCandidateRegistration=async(e)=>{
      try{
        e.preventDefault();
        const token  = localStorage.getItem("token");
  
        // Set headers in config
        const config = {
            headers: {
                'x-access-token': token
            }
        };
        await uploadCanidateImage(file)
        // Send the post request with an empty body (or any data if required)
        //const res = await axios.post("http://localhost:3000/api/postCandidateImage", {}, config);
        // console.log(res.data)
        // const name = nameRef.current.value;
        // const age = ageRef.current.value;
        // const gender = genderRef.current.value;
        // const party = partyRef.current.value;
        // console.log(name,age,gender,party)
        // await contractInstance.registerCandidate(name,party,age,gender)
        // console.log("Registration is successful")
      }catch(error){
        console.error(error)
      }
  }
  return(<>
    <form onSubmit={handleCandidateRegistration}>
        <label>Name:
            <input type="text" ref={nameRef}></input>
        </label>
        <label>Age:
            <input type="text" ref={ageRef}></input>
        </label>
        <label>Gender:
            <input type="text" ref={genderRef}></input>
        </label>
        <label>Party:
            <input type="text" ref={partyRef}></input>
        </label>
        <button type="submit">Register</button>
    </form>
    <input type="file" onChange={(e)=>setFile(e.target.files[0])}></input>
   
  </>)
}
export default RegisterCandidate;