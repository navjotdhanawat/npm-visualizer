import { connect } from 'react-redux'
import { fetchTodos, fetchTodosSuccess, fetchTodosFailure, fetchDependancies, fetchDependanciesSuccess, fetchDependanciesFailure } from '../actions/index';
import About from '../components/About';


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

const AboutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(About)

export default AboutContainer;