import axios from "axios";



const axiosPublic = axios.create({
    baseURL:'https://medi-bazaar-backend.vercel.app',
    // withCredentials:true
})


const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;