/**
 * The appReducer function updates the state of the app depending on the dispatched action.
 * @param {Object} state - The current state of the app.
 * @param {Object} action - The action that was dispatched.
 * @returns {Object} The updated state of the app.
 * 
 *  * The function handles the following cases:
 *  - SET_TOKEN: sets the JWT token in the state.
 *  - LOGOUT: clears the JWT token in the state.
 *  - NEW_PRODUCT: adds a new product to the 'products' array in the state.
 *  - SET_PRODUCTS: sets the 'products' array in the state to the fetched data from the server.
 *  - UPDATE_PRODUCT: updates the 'products' array in the state with the edited product.
 *  - DELETE_PRODUCT: removes a product from the 'products' array in the state.
 *  - SET_SEARCH_STATUS: sets the search status in the state (e.g., whether a search is in progress).
 *  - SET_SEARCH_QUERY: sets the search query in the state.
 *  - DELETE_COMPLETED: removes completed items from the 'products' array in the state.
 *  - DELETE_ALL: clears the 'products' array in the state.
 */

const appReducer = (state = {
    products: [],
    search_query: '',
    token: ''

}, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            return { ...state, token: action.token }
        case "LOGOUT":
            return { ...state, token: '' }
        case "NEW_PRODUCT":
            let tempNew = [...state.products]
            tempNew.push(action.product)
            return { ...state, products: tempNew }
        case "SET_PRODUCTS":
            return { ...state, products: action.data }
        case "UPDATE_PRODUCT":
            return { ...state, products: action.tempToUpdate }
        case "DELETE_PRODUCT":
            return { ...state, products: action.tempToDelete }
        case "SET_SEARCH_STATUS":
            return { ...state, search_status: action.search_status }
        case "SET_SEARCH_QUERY":
            return { ...state, search_query: action.search_query }
        case "DELETE_COMPLETED":
            return { ...state, products: action.items }
        case "DELETE_ALL":
            let clear = []
            return { ...state, products: clear }
        default:
            return state;
    }
};

export default appReducer;
