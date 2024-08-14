import axios from "axios";

const customFetch = axios.create({
    baseURL : "https://web-production-491a.up.railway.app/api/v1"
})


export default customFetch;