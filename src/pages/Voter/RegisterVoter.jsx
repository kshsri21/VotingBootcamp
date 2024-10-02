import { useState,useRef,useEffect} from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"

const RegisterVoter = ()=>{
  const {web3State} = useWeb3Context()
  const {contractInstance} = web3State;

  const [file, setFile] = useState(null);
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);

    // Gender Enum Mapping
  const genderEnum = {
    NotSpecified: 0,
    Male: 1,
    Female: 2,
    Other: 3,
  };
  
  
  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigateTo("/");
    }
  }, [navigateTo, token]);
  const handleVoterRegistration=async(e)=>{

      try{
        e.preventDefault();
        const name = nameRef.current.value;
        const age = ageRef.current.value;
        const gender = genderRef.current.value;
       
        if (!contractInstance) {
          throw new Error("Contract instance not found!");
        }

        const imageUploadStatus = await uploadVoteImage(file);
        if (imageUploadStatus === true) {
          await contractInstance.registerVoter(name, age, gender);
          // Clear the form after successful registration
          nameRef.current.value = "";
          ageRef.current.value = "";
          genderRef.current.value = "";
          alert("Registration Successful");
          setFile(null);
        } else {
          throw new Error("Voter Registration Failed!");
        }

      }catch(error){
        toast.error("Error: Registering Voter")
        console.error(error)
      }
  }
  return(<div>
     <br></br>
    <form onSubmit={handleVoterRegistration}>
        <label>Name: </label>
            <input type="text" ref={nameRef}></input>
       
        <label>Age: </label>
            <input type="text" ref={ageRef}></input>
       

        <label>Gender:</label>
        <select ref={genderRef} required>
          <option value={genderEnum.NotSpecified}>Not Specified</option>
          <option value={genderEnum.Male}>Male</option>
          <option value={genderEnum.Female}>Female</option>
          <option value={genderEnum.Other}>Other</option>
        </select>
        <br></br>
        <button type="submit">Register</button>
    </form>
    <br></br>
    <input 
        type="file" 
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])} 
        required
      />
  </div>)
}
export default RegisterVoter;