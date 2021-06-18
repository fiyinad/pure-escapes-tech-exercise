export interface Product {
    id: number;
    name: string;
    customerPrice: number;
    cost: number;
}

export interface IProductsDomain {
    value: Array<Product>;
    loading: boolean;
    error: boolean;
}

export const initialState: IProductsDomain = {
    value: [],
    loading: false,
    error: false
};
