import {
    FETCH_DEPENDANCIES, FETCH_DEPENDANCIES_SUCCESS, FETCH_DEPENDANCIES_FAILURE
} from '../actions/index';


const INITIAL_STATE = {};

const dep = (state = INITIAL_STATE, action) => {
    let error;
    switch(action.type) {

        case FETCH_DEPENDANCIES:

            return state
        case FETCH_DEPENDANCIES_SUCCESS:
            debugger
            return action.payload;
        case FETCH_DEPENDANCIES_FAILURE:

            error = action.payload || {message: action.payload.message};
            return {};//{ ...state, data: [], error: error, loading: false };
        default:
            return state;
    }
}

export default dep