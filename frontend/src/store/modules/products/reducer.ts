import { IProductsDomain, initialState, Product } from './model';
import * as Actions from './actions';

const upsert = (arr: Array<Product>, object: Product) => {
    const i = arr.findIndex(_object => _object.id === object.id);
    if (i > -1) arr[i] = object; 
    else arr.push(object);
    return arr;
}

const productsReducer = (state: IProductsDomain = initialState, action: Actions.ProductsAction) => {
    switch (action.type) {
        case Actions.GET_ALL:
            return { ...state, value: [...action.payload] };

        case Actions.GET_SINGLE:

            return { ...state, value: upsert([...state.value], action.payload) };

        case Actions.GET_ALL_REQUEST:
            return { ...state, loading: true, error: false };

        case Actions.GET_ALL_SUCCESS:
            return { ...state, loading: false, error: false };

        case Actions.GET_ALL_FAILURE:
            return { ...state, loading: false, error: true };

        default:
            return state;
    }
};

export default productsReducer;
