import { DeleteProductDAL } from "../DAL/DeleteProduct"
import { GetProducts } from "../DAL/GetProducts"
import { LoginDAL } from "../DAL/Login"
import { NewProduct } from "../DAL/NewProduct"
import { UpdateProducts } from "../DAL/UpdateProducts"


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
export const Logout = async () => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'DELETE_ALL' })
            dispatch({ type: 'LOGOUT' })
        } catch (error) {

        }
    }

}

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



export const onSerachStatus = (search_status) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_SEARCH_STATUS', search_status })
        } catch (err) {
            console.log('Search: err in searching', err)
        }
    }
}
export const onSerachQuery = (search_query) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_SEARCH_QUERY', search_query })
        } catch (err) {
            console.log('Search: err in searching', err)
        }
    }
}