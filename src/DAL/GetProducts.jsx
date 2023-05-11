import axios from 'axios'
import { REACT_APP_AWS_API_URL } from '../Constants'

export const GetProducts = async (token) => {
    let resp = await axios.get(`${REACT_APP_AWS_API_URL}/products`, { headers: { "authorization": `Bearer ${token}` } })
    return resp.data

}