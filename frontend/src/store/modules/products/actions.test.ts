import {
    getAllAction,
    getSingleAction,
    getAllRequestAction,
    getAllFailureAction,
    getAllSuccessAction
} from "./actions";

describe('Products actions', () => {
    it('GetAll action', () => {
        const payload = [
            { "id": 1, "name": "Soup", "customerPrice": 199, "cost": 186 },
            { "id": 2, "name": "Bread", "customerPrice": 87, "cost": 21 },
            { "id": 3, "name": "Cheese", "customerPrice": 275, "cost": 234 },
            { "id": 4, "name": "Milk", "customerPrice": 67, "cost": 61 }];
        expect(getAllAction(payload)).toMatchSnapshot();
    });

    it('GetSingle action', () => {
        const payload = { "id": 1, "name": "Soup", "customerPrice": 199, "cost": 186 };
        expect(getSingleAction(payload)).toMatchSnapshot();
    });

    it('Get ALL request action', () => {
        expect(getAllRequestAction()).toMatchSnapshot();
    });

    it('GET ALL success action', () => {
        expect(getAllSuccessAction()).toMatchSnapshot();
    });

    it('GET ALL failure action', () => {
        expect(getAllFailureAction()).toMatchSnapshot();
    });
});
