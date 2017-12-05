import axios from 'axios';
import { remote, ipcRenderer } from 'electron';

export const FETCH_DEPENDANCIES = 'FETCH_DEPENDANCIES';
export const FETCH_DEPENDANCIES_SUCCESS = 'FETCH_DEPENDANCIES_SUCCESS';
export const FETCH_DEPENDANCIES_FAILURE = 'FETCH_DEPENDANCIES_FAILURE';

export function fetchDependancies(path) {
    ipcRenderer.send('package-list', path);
    return {
        type: FETCH_DEPENDANCIES,
        payload: {}
    };
}

export function loadHomeItems() {
	return function (dispatch) {
		dispatch(requestItems());
		return itemApi.getHomeItems().then(items => {
			var state = items.docs;
			dispatch(loadHomeItemsSuccess(state));
		}).catch(error => {
			throw (error);
		});
	};
}

export function fetchDependanciesSuccess(data) {

    return {
        type: FETCH_DEPENDANCIES_SUCCESS,
        payload: data
    };
}

export function fetchDependanciesFailure(error) {
    return {
        type: FETCH_TODO_FAILURE,
        payload: error
    };
}