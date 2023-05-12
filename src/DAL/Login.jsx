/**
 * Logs the user in by sending a POST request to the AWS authentication API.
 * @param {object} data - The login credentials of the user, username and password.
 * @returns {Promise} The response from the authentication API, it includes a token and the user info.
 */

import axios from 'axios'
import { REACT_APP_AWS_AUTH_API_URL } from '../Constants'

export const LoginDAL = async (data) => {
    let resp = await axios.post(`${REACT_APP_AWS_AUTH_API_URL}/auth/login`, data)
    return resp
}