import { DeleteProductDAL } from "../DAL/DeleteProduct"
import { GetProducts } from "../DAL/GetProducts"
import { LoginDAL } from "../DAL/Login"
import { NewProduct } from "../DAL/NewProduct"
import { UpdateProducts } from "../DAL/UpdateProducts"


/**
    This function takes in a username and password and returns a redux-thunk action creator that will authenticate
    the user with the server. If successful, the function will store the user's authentication token in the redux store.
    @param {string} username - The username of the user to be authenticated.
    @param {string} password - The password of the user to be authenticated.
    @returns {Function} - A redux-thunk action creator that will authenticate the user with the server.
*/

export const Login = async (username, password) => {
    return async (dispatch) => {
        try {
            const response = await LoginDAL({ username, password })
            if (response.status === 200) {
                try {
                    let token = response?.data?.token
                    dispatch({ type: 'SET_TOKEN', token })
                } catch (err) {
                    console.log('Login: err in setting Token', err)
                }
            }
        } catch (error) {

        }
    }

}

/**
    This function returns a redux-thunk action creator that will remove all user data from the redux store and log the user out.
    @returns {Function} - A redux-thunk action creator that will log the user out.
*/

export const Logout = async () => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'DELETE_ALL' })
            dispatch({ type: 'LOGOUT' })
        } catch (error) {

        }
    }

}
/**
    This function takes in product data and an authentication token and returns a redux-thunk action creator that will
    save the product to the database. If successful, the function will add the new product to the redux store.
    @param {object} productData - The data of the product to be saved to the database.
    @param {string} authToken - The authentication token of the user saving the product.
    @returns {Function} - A redux-thunk action creator that will save the product to the database.
*/

export const SaveNewProduct = (data, token) => {
    return async (dispatch) => {
        try {
            let product = { "name": data.name, "description": data.descrtiption, "price": data.price, "quantity": data.quantity }
            const response = await NewProduct(product, token)
            if (response.status === 200) {
                try {
                    product.ID = response?.data?.ProductId
                    dispatch({ type: 'NEW_PRODUCT', product })
                } catch (err) {
                    console.log('New Product: err in Save new product', err)
                }
            }
        } catch (err) {
            console.log('New Product: err in Save new product', err)
        }
    }
}

/**
    This function takes in an authentication token and returns a redux-thunk action creator that will retrieve all
    products from the database and add them to the redux store.
    @param {string} authToken - The authentication token of the user retrieving the products.
    @returns {Function} - A redux-thunk action creator that will retrieve all products from the database.
*/
export const SaveProducts = (token) => {
    return async (dispatch) => {
        try {
            const data = await GetProducts(token)
            dispatch({ type: 'SET_PRODUCTS', data })
        } catch (err) {
            console.log('Save Products: err in Products', err)
        }
    }
}

/**
    This function takes in an array of products, the updated product data, and an authentication token and returns a
    redux-thunk action creator that will update the specified product in the database. If successful, the function
    will update the corresponding product in the redux store.
    @param {array} products - The array of products to search for the product to be updated.
    @param {object} updatedProductData - The updated data of the product to be updated in the database.
    @param {string} authToken - The authentication token of the user updating the product.
    @returns {Function} - A redux-thunk action creator that will update the specified product in the database.
*/
export const UpdateProduct = (products, updated, token) => {
    return async (dispatch) => {
        let obj = { "ID": updated.ID, "name": updated.name, "description": updated.description, "price": updated.price, "quantity": updated.quantity }
        const response = await UpdateProducts(token, obj, obj.ID)
        if (response.status === 200) {
            let tempToUpdate = [...products]
            let index = tempToUpdate.findIndex(item => item.ID === updated.ID);
            tempToUpdate[index] = updated
            try {
                dispatch({ type: 'UPDATE_PRODUCT', tempToUpdate })
            } catch (err) {
                console.log('Update product: err in update product', err)
            }
        }
        else {
            alert(response.status)
        }

    }
}

/**
    This function takes in an array of products, the ID of the product to delete, and an authentication token and
    returns a redux-thunk action creator that will delete the specified product from the database. If successful,
    the function will remove the corresponding product from the redux store.
    @param {array} products - The array of products to search for the product to be deleted.
    @param {string} productId - The ID of the product to be deleted from the database.
    @param {string} authToken - The authentication token of the user deleting the product.
    @returns {Function} - A redux-thunk action creator that will delete the specified product from the database.
*/
export const DeleteProduct = (products, id, token) => {
    return async (dispatch) => {
        const response = await DeleteProductDAL(token, id)
        if (response.status === 200) {
            let tempToDelete = [...products]
            let index = tempToDelete.findIndex(item => item.ID === id);
            tempToDelete.splice(index, 1)
            try {
                dispatch({ type: 'DELETE_PRODUCT', tempToDelete })
            } catch (err) {
                console.log('Delete product: err in Delete product', err)
            }
        }
        else {
            alert('Error deleiting item', response.status)
        }

    }
}

/**
    This function takes in a search query and returns a redux-thunk action creator that will update the search query
    in the redux store.
    @param {string} search_query - The query of the search.
    @returns {Function} - A redux-thunk action creator that will update the search status in the redux store.
*/
export const onSerachQuery = (search_query) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_SEARCH_QUERY', search_query })
        } catch (err) {
            console.log('Search: err in searching', err)
        }
    }
}