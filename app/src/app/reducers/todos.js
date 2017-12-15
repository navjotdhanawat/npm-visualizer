import {
    FETCH_DEPENDANCIES, FETCH_DEPENDANCIES_SUCCESS, FETCH_DEPENDANCIES_FAILURE
} from '../actions/index';


const INITIAL_STATE = {data: {}, loader: false}

const dep = (state = INITIAL_STATE, action) => {
    let error;
    switch(action.type) {

        case FETCH_DEPENDANCIES:

            state.loader = true;
            return {data: {}, loader: true}
        case FETCH_DEPENDANCIES_SUCCESS:

            return {data: action.payload, loader: false};
        case FETCH_DEPENDANCIES_FAILURE:

            error = action.payload || {message: action.payload.message};
            return {};//{ ...state, data: [], error: error, loading: false };
        default:
            return state;
    }
}

export default dep