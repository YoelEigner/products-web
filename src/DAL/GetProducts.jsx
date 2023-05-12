/**
 * Fetches the list of products from the AWS API.
 * @param {string} token - The JWT token used to authenticate the request.
 * @returns {Promise} The list of products retrieved from the API.
 */

import axios from 'axios'
import { REACT_APP_AWS_API_URL } from '../Constants'

export const GetProducts = async (token) => {
    let resp = await axios.get(`${REACT_APP_AWS_API_URL}/products`, { headers: { "authorization": `Bearer ${token}` } })
    return resp.data

}