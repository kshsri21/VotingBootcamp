import axios from "axios";

export const uploadCanidateImage = async(file) =>{
    try{
        const formData = new FormData();
        formData.append("file",file)
        const token  = localStorage.getItem("token");
  
        // Set headers in config
        const config = {
            headers: {
                'x-access-token': token
            }
        };
        const res = await axios.post("http://localhost:3000/api/postCandidateImage",formData,config)
        console.log(res.data)
    }catch(error){
        console.error(error)
    }
}

//uploadVoterImage
//VoterRegistration
//make changes in the RegisterVoter