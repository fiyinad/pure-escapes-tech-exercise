import React from 'react';
import * as ReactRedux from 'react-redux'
import axios from 'axios';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Products from './index';
import { initialState } from '../../store/modules/products/model';

describe('Products', () => {
    const mockXXXFn = jest.fn();
    const mockUseDispatch =
        jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(mockXXXFn);
    const mockUseSelector =
        jest.spyOn(ReactRedux, 'useSelector').mockReturnValue(initialState);
    const mockAxios = jest.spyOn(axios, 'get');

    afterEach(() => {
        mockUseDispatch.mockClear();
        mockUseSelector.mockClear();
        mockAxios.mockClear();
    })

    it('Renders without errors in default state', () => {
        // arrange, act
        const component = shallow(<Products />);

        // assert
        expect(toJson(component)).toMatchSnapshot();
    });

    it('Renders without errors in loading state', () => {
        // arrange
        const mockedState = {
            ...initialState,
            loading: true
        }
        mockUseSelector.mockReturnValueOnce(mockedState.loading); // mock productsLoadingSelector

        // act
        const component = shallow(<Products />);

        // assert
        expect(toJson(component)).toMatchSnapshot();
    });

    it('Renders without errors with pre-loaded state', () => {
        // arrange
        const payload = [
            { "id": 1, "name": "Soup", "customerPrice": 199, "cost": 186 },
            { "id": 2, "name": "Bread", "customerPrice": 87, "cost": 21 },
            { "id": 3, "name": "Cheese", "customerPrice": 275, "cost": 234 },
            { "id": 4, "name": "Milk", "customerPrice": 67, "cost": 61 }];
        const mockedState = {
            ...initialState,
            value: payload
        };
        mockAxios.mockImplementationOnce(() => Promise.resolve(payload));
        mockUseSelector.mockReturnValueOnce(mockedState.loading); // mock productsLoadingSelector
        mockUseSelector.mockReturnValueOnce(mockedState.value); // mock productsSelector

        // act
        const component = shallow(<Products />);
        component.update();

        // assert
        expect(toJson(component)).toMatchSnapshot();
    });
});