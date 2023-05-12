/**
 * Sends a DELETE request to the AWS API to delete a product with the specified ID.
 * @param {string} token - The JWT token used to authenticate the request.
 * @param {string} id - The ID of the product to be deleted.
 * @returns {Promise} The response from the API.
 */

import axios from 'axios'
import { REACT_APP_AWS_API_URL } from '../Constants'

export const DeleteProductDAL = async (token, id) => {
    let resp = await axios.delete(`${REACT_APP_AWS_API_URL}/products/${id}`, { headers: { "authorization": `Bearer ${token}` } })
    return resp
}