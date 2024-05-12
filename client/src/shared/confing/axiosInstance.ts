import axios from "axios";

const url = "http://localhost:3001/"

export default axios.create({
    baseURL : url
})