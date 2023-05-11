import axios from 'axios'
import { REACT_APP_AWS_API_URL } from '../Constants'

export const UpdateProducts = async (token, data, id) => {
    let resp = await axios.put(`${REACT_APP_AWS_API_URL}/products/${id}`, data, { headers: { "authorization": `Bearer ${token}` } })
    return resp
}