import * as actionType from '../actions/home';

export const initialState = {
    isOpen: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_DATA:
            return Object.assign({}, state, { isOpen: action.data });
        default:
            return state;
    }
};
