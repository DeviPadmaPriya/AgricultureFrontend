import axios from "axios"

const url = "http://localhost:8083/user";
const viewUserUrl = "http://localhost:8083/user/getById/";

const register=data=>{
    return axios.post(`${url}/signup`,data);
}

const signin = data=>{
   return axios.post(`${url}/signin`,data);
}

const findUserId=(userid)=>{
    return axios.get(viewUserUrl+userid);
   }



export default{register,signin,findUserId};