import axios from 'axios'
import { REACT_APP_AWS_API_URL } from '../Constants'

export const NewProduct = async (data, token) => {
    let resp = await axios.post(`${REACT_APP_AWS_API_URL}/products/`, data, { headers: { "authorization": `Bearer ${token}` } })
    return resp
}