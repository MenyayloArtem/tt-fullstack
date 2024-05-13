import axios from "axios";

const url = "http://localhost:3002/"

export default axios.create({
    baseURL : url
})