/**
 * Sends a PUT request to the AWS API to update a product with the specified ID.
 * @param {string} token - The JWT token used to authenticate the request.
 * @param {Object} data - The updated product data to be sent to the API { ID, name, description, price, quantity }.
 * @param {string} id - The ID of the product to be updated.
 * @returns {Promise} The response from the API.
 */

import axios from 'axios'
import { REACT_APP_AWS_API_URL } from '../Constants'

export const UpdateProducts = async (token, data, id) => {
    let resp = await axios.put(`${REACT_APP_AWS_API_URL}/products/${id}`, data, { headers: { "authorization": `Bearer ${token}` } })
    return resp
}