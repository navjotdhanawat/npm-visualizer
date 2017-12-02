import { connect } from 'react-redux'
import { fetchTodos, fetchTodosSuccess, fetchTodosFailure, fetchDependancies, fetchDependanciesSuccess, fetchDependanciesFailure } from '../actions/index';
import TodoList from '../components/TodoList';


const mapStateToProps = (state) => {

    return {
        data: state.dep.data
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDependancies: () => {
            dispatch(fetchDependancies()).then((response) => {
                !response.error ? dispatch(fetchDependanciesSuccess(response.payload.data)) : dispatch(fetchDependanciesFailure(response.payload.data));
            });
        }
    }
}

const TodoListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default TodoListContainer;