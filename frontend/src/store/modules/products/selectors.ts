import { IProductsDomain } from './model';
import { createSelector } from 'reselect';

export const productsDomain = (state: any): IProductsDomain => state.products;

export const productsSelector = createSelector(
    productsDomain,
    (domain: IProductsDomain): IProductsDomain['value'] => domain.value
);

export const productsLoadingSelector = createSelector(
    productsDomain,
    (domain: IProductsDomain): IProductsDomain['loading'] => domain.loading
);
