import * as Actions from './actions';
import reducer from './reducer';
import { initialState } from './model';

describe('Products reducer', () => {
    beforeEach(() => {
        jest.resetModules()
    });

    it('handles GET_ALL correctly', () => {
        const payload = [
            { "id": 1, "name": "Soup", "customerPrice": 199, "cost": 186 },
            { "id": 2, "name": "Bread", "customerPrice": 87, "cost": 21 },
            { "id": 3, "name": "Cheese", "customerPrice": 275, "cost": 234 },
            { "id": 4, "name": "Milk", "customerPrice": 67, "cost": 61 }];
        const action = Actions.getAllAction(payload);
        const result = reducer(initialState, action);
        const expected = { ...initialState, value: payload };
        expect(result).toEqual(expected);
    });

    it('handles GET_SINGLE correctly', () => {
        const payload = { "id": 1, "name": "Soup", "customerPrice": 199, "cost": 186 };
        const action = Actions.getSingleAction(payload);
        const result = reducer(initialState, action);
        const expected = { ...initialState, value: [{...payload}] };
        expect(result).toEqual(expected);
    });

    it('handles GET_ALL_REQUEST correctly', () => {
        const action = Actions.getAllRequestAction();
        const result = reducer(initialState, action);
        const expected = { ...initialState, loading: true, error: false };
        expect(result).toEqual(expected);
    });

    it('handles GET_ALL_SUCCESS correctly', () => {
        const action = Actions.getAllSuccessAction();
        const result = reducer(initialState, action);
        const expected = { ...initialState, loading: false, error: false };
        expect(result).toEqual(expected);
    });

    it('handles GET_ALL_FAILURE correctly', () => {
        const action = Actions.getAllFailureAction();
        const result = reducer(initialState, action);
        const expected = { ...initialState, loading: false, error: true };
        expect(result).toEqual(expected);
    });

});
