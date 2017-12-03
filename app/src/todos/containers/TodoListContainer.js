import { connect } from 'react-redux'
import { fetchTodos, fetchTodosSuccess, fetchTodosFailure, fetchDependancies, fetchDependanciesSuccess, fetchDependanciesFailure } from '../actions/index';
import TodoList from '../components/TodoList';


const mapStateToProps = (state) => {

    return {
        data: state.data
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDependancies: (path) => {
            dispatch(fetchDependancies(path));
        },
        fetchDependanciesSuccess: (data) => {
            dispatch(fetchDependanciesSuccess(data));
        }
    }
}

const TodoListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default TodoListContainer;