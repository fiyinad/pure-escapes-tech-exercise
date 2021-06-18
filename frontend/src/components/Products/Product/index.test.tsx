import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Product, { IProductProps } from './index';
import { Product as ProductModel } from '../../../store/modules/products/model';

describe('Product', () => {
    it('Renders without errors in default state', () => {
        // arrange, 
        const props = {} as IProductProps;
        
        // act
        const component = shallow(<Product {...props} />);

        // assert
        expect(toJson(component)).toMatchSnapshot();
    });

    it('Renders without errors with populated state', () => {
        // arrange, 
        const product: ProductModel = { "id": 1, "name": "Soup", "customerPrice": 199, "cost": 186 };
        const props = {
            product,
            onAdd: jest.fn(),
            onRemove: jest.fn(),
        } as IProductProps;
        
        // act
        const component = shallow(<Product {...props} />);

        // assert
        expect(toJson(component)).toMatchSnapshot();
    });
});