import {
    FETCH_DEPENDANCIES, FETCH_DEPENDANCIES_SUCCESS, FETCH_DEPENDANCIES_FAILURE
} from '../actions/index';


const INITIAL_STATE = { data: [], error: null, loading: false};

const dep = (state = INITIAL_STATE, action) => {
    let error;
    switch(action.type) {

        case FETCH_DEPENDANCIES:

            return {};//{ ...state, data: [], error: null, loading: true } ;
        case FETCH_DEPENDANCIES_SUCCESS:

            return {};//{ ...state, data: action.payload, error: null, loading: false };
        case FETCH_DEPENDANCIES_FAILURE:

            error = action.payload || {message: action.payload.message};
            return {};//{ ...state, data: [], error: error, loading: false };
        default:
            return state;
    }
}

export default dep