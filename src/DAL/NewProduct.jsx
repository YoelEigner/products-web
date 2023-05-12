/**
 * Sends a POST request to the AWS API to create a new product.
 * @param {Object} data - The product data to be sent to the API { name, description, price, quantity }.
 * @param {string} token - The JWT token used to authenticate the request.
 * @returns {Promise} The response from the API.
 * 
 */

import axios from 'axios'
import { REACT_APP_AWS_API_URL } from '../Constants'

export const NewProduct = async (data, token) => {
    let resp = await axios.post(`${REACT_APP_AWS_API_URL}/products/`, data, { headers: { "authorization": `Bearer ${token}` } })
    return resp
}