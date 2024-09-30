// uploadVoterImage.js
import axios from "axios";

export const uploadVoterImage = async (file) => {
  try {
   
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("token");
    // Set headers in config
    const config = {
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data'
      }
    };
    const res = await axios.post("http://localhost:3000/api/postVoterImage", formData, config);
    console.log(res)
    if (res.data.message === "successful") { 
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};