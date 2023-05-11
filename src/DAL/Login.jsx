import axios from 'axios'
import { REACT_APP_AWS_AUTH_API_URL } from '../Constants'

export const LoginDAL = async (data) => {
    let resp = await axios.post(`${REACT_APP_AWS_AUTH_API_URL}/auth/login`, data)
    return resp
}