import axios from "axios";

export const uploadVoterImage = async(file) =>{

    try {
         const formData = new FormData();
         formData.append('file',file)

         const token  = localStorage.getItem('token');
         const config ={
           headers:{
             "x-access-token":token,
             'Content-Type': 'multipart/form-data'
           }
         }

         const res = await axios.post("http://localhost:3000/api/postVoterImage",formData,config)
         console.log("response :",res.data)
         if (res.data.message && res.data.message.trim().toLowerCase() === "successful") { 
            return true;
          }
          return false;
    } catch (error) {
        console.error("Image upload error:", error.response ? error.response.data : error.message);
    return false;
    }
   
}