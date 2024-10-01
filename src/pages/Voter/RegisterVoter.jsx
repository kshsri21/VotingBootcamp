import { useRef,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useWeb3Context } from "../../context/useWeb3Context";
import {uploadVoterImage} from "../../utils/uploadVoterImage";
import "./RegisterVoter.css"

const RegisterVoter = ()=>{
  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigateTo("/");
    }
  }, [navigateTo, token]);

  const [file, setFile] = useState(null);
  const {web3State} = useWeb3Context()
  const {contractInstance} = web3State;
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);

  const handleVoterRegistration=async(e)=>{
      try{
        e.preventDefault();
        const name = nameRef.current.value;
        const age =parseInt(ageRef.current.value);
        const gender = genderRef.current.value;
       
      if (!contractInstance) {
        throw new Error("Contract instance not found!");
      }
       // Log the voter details for debugging
    // console.log("Voter Details:", { name, age, gender });
      const imageUploadStatus = await uploadVoterImage(file);
     
      // console.log("Contract Instance:", contractInstance);
      // console.log("Method ABI:", contractInstance.interface.functions.registerVoter);
      // console.log("Connected Wallet Address:", web3State.selectedAccount);
      if (imageUploadStatus === true) {
      const tx = await contractInstance.registerVoter(name, age, gender);
        await tx.wait();
        // Clear the form after registration
        nameRef.current.value = "";
        ageRef.current.value = "";
        genderRef.current.value = "";
        alert("Registration Successful")
        setFile(null);
        console.log(name,age,gender)
      } else {
        throw new Error("Voter Registration Failed!");
      }
   }  catch(error){
        console.error(error)
        alert("Registration Failed")
      }
  }
  return(<>
    <form onSubmit={handleVoterRegistration}>
        <label>Voter Name:
            <input type="text" ref={nameRef}></input>
        </label>
        <label>Voter Age:
            <input type="text" ref={ageRef}></input>
        </label>
        <label>Voter Gender:
            <input type="text" ref={genderRef}></input>
        </label>
       
        <button type="submit">Register</button>
    </form>
    <br></br>
      <input 
        type="file" 
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])} 
        required
      />
  </>)
}
export default RegisterVoter;