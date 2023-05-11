const appReducer = (state = {
    products: [],
    search_query: '',
    search_status: '',
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
