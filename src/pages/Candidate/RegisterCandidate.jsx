import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { useWeb3Context } from "../../context/useWeb3Context";
import { uploadCandidateImage } from "../../utils/uploadCandidateImage"; // Correct spelling
import {toast} from "react-hot-toast"
import "./RegisterCandidate.css"

const RegisterCandidate = () => {
  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigateTo("/");
    }
  }, [navigateTo, token]);

  const [file, setFile] = useState(null);
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  const nameRef = useRef(null);
  const genderRef = useRef(null);
  const partyRef = useRef(null);
  const ageRef = useRef(null);

  // Gender Enum Mapping
  const genderEnum = {
    NotSpecified: 0,
    Male: 1,
    Female: 2,
    Other: 3,
  };

  const handleCandidateRegistration = async (e) => {
    e.preventDefault();
    try {
      const name = nameRef.current.value;
      const age = ageRef.current.value;
      const gender = genderRef.current.value;  // Numeric value from dropdown
      const party = partyRef.current.value;

      if (!contractInstance) {
        throw new Error("Contract instance not found!");
      }

      const imageUploadStatus = await uploadCandidateImage(file);
      if (imageUploadStatus === true) {
        await contractInstance.registerCandidate(name, party, age, gender);
        // Clear the form after successful registration
        nameRef.current.value = "";
        ageRef.current.value = "";
        genderRef.current.value = "";
        partyRef.current.value = "";
        alert("Registration Successful");
        setFile(null);
      } else {
        throw new Error("Candidate Registration Failed!");
      }
    } catch (error) {
      toast.error("Error: Registering Candidate")
      console.error(error);
    }
  };

  return (
    <div>
      <br></br>
      <form onSubmit={handleCandidateRegistration}>
        <label>Candidate Name:</label>
        <input type="text" ref={nameRef} required />
        
        <label>Candidate Age:</label>
        <input type="text" ref={ageRef} required />
        
        <label>Gender:</label>
        <select ref={genderRef} required>
          <option value={genderEnum.NotSpecified}>Not Specified</option>
          <option value={genderEnum.Male}>Male</option>
          <option value={genderEnum.Female}>Female</option>
          <option value={genderEnum.Other}>Other</option>
        </select>
        
        <label>Candidate Party:</label>
        <input type="text" ref={partyRef} required />
        
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
    </div>
  );
};

export default RegisterCandidate;
