import axios from 'axios'
import { REACT_APP_AWS_API_URL } from '../Constants'

export const DeleteProductDAL = async (token, id) => {
    let resp = await axios.delete(`${REACT_APP_AWS_API_URL}/products/${id}`, { headers: { "authorization": `Bearer ${token}` } })
    return resp
}