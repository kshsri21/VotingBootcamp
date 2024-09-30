import { useRef, useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import { uploadVoterImage } from "../../utils/uploadVoterImage";
import "./RegisterVoter.css"

const RegisterVoter = ()=>{
  const {web3State} = useWeb3Context()
  const {contractInstance} = web3State;
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleVoterRegistration=async(e)=>{
    e.preventDefault();
      try{
        const name = nameRef.current.value;
        const age = ageRef.current.value;
        const gender = genderRef.current.value;

        if (!contractInstance) {
          throw new Error("Contract instance not found!");
        }

        const imageUploadStatus = await uploadVoterImage(file);
        if (imageUploadStatus === true) {
          await contractInstance.registerVoter(name, age, gender);
          // Clear the form after successful registration
          nameRef.current.value = "";
          ageRef.current.value = "";
          genderRef.current.value = "";
          alert("Registration Successful")
          setFile(null);
        } else {
          throw new Error("Candidate Registration Failed!");
        }
       
        console.log(name,age,gender)
      }catch(error){
        console.error(error)
      }
  }
  return(<>
    <form className="form-container" onSubmit={handleVoterRegistration}>
        <label>Name:
            <input type="text" ref={nameRef}></input>
        </label>
        <label>Age:
            <input type="text" ref={ageRef}></input>
        </label>
        <label>Gender:
            <input type="text" ref={genderRef}></input>
        </label>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])} 
          required
      />
       
        <button type="submit">Register</button>
    </form>
  </>)
}
export default RegisterVoter;