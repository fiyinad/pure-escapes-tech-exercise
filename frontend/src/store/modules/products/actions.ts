import { Product } from "./model";

export const GET_ALL_REQUEST = 'GET_ALL_REQUEST';
export const GET_ALL_SUCCESS = 'GET_ALL_SUCCESS';
export const GET_ALL_FAILURE = 'GET_ALL_FAILURE';
export const GET_ALL = 'GET_ALL';
export const GET_SINGLE = 'GET_SINGLE';

export type GetAllRequestAction = ReturnType<typeof getAllRequestAction>;
export const getAllRequestAction = () => ({
  type: GET_ALL_REQUEST as typeof GET_ALL_REQUEST
});

export type GetAllSuccessAction = ReturnType<typeof getAllSuccessAction>;
export const getAllSuccessAction = () => ({
  type: GET_ALL_SUCCESS as typeof GET_ALL_SUCCESS
});

export type GetAllFailureAction = ReturnType<typeof getAllFailureAction>;
export const getAllFailureAction = () => ({
  type: GET_ALL_FAILURE as typeof GET_ALL_FAILURE
});

export type GetAllAction = ReturnType<typeof getAllAction>;
export const getAllAction = (payload: Array<Product>) => ({
  type: GET_ALL as typeof GET_ALL,
  payload,
});

export type GetSingleAction = ReturnType<typeof getSingleAction>;
export const getSingleAction = (payload: Product) => ({
  type: GET_SINGLE as typeof GET_SINGLE,
  payload 
});

export type ProductsAction =
  | GetAllRequestAction
  | GetAllSuccessAction
  | GetAllFailureAction
  | GetAllAction
  | GetSingleAction;
