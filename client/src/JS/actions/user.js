import axios from "axios";




export const getUsersCount = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/users/total`);
  };