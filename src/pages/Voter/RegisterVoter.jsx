import { useRef } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";

const RegisterVoter = ()=>{
  const {contractInstance} = useWeb3Context()
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);
  const handleVoterRegistration=async(e)=>{
      try{
        e.preventDefault();
        const name = nameRef.current.value;
        const age = ageRef.current.value;
        const gender = genderRef.current.value;
       
        console.log(name,age,gender)
      }catch(error){
        console.error(error)
      }
  }
  return(<>
    <form onSubmit={handleVoterRegistration}>
        <label>Name:
            <input type="text" ref={nameRef}></input>
        </label>
        <label>Age:
            <input type="text" ref={ageRef}></input>
        </label>
        <label>Gender:
            <input type="text" ref={genderRef}></input>
        </label>
       
        <button type="submit">Register</button>
    </form>
  </>)
}
export default RegisterVoter;