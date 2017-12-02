import axios from 'axios';


export const FETCH_DEPENDANCIES = 'FETCH_DEPENDANCIES';
export const FETCH_DEPENDANCIES_SUCCESS = 'FETCH_DEPENDANCIES_SUCCESS';
export const FETCH_DEPENDANCIES_FAILURE = 'FETCH_DEPENDANCIES_FAILURE';

export function fetchDependancies() {
    const request = axios.get('http://localhost:8080/api/get-dependencies');
    return {
        type: FETCH_DEPENDANCIES,
        payload: request
    };
}

export function fetchDependanciesSuccess(todos) {
    return {
        type: FETCH_DEPENDANCIES_SUCCESS,
        payload: todos
    };
}

export function fetchDependanciesFailure(error) {
    return {
        type: FETCH_TODO_FAILURE,
        payload: error
    };
}