import { connect } from 'react-redux'
import { fetchDependancies, fetchDependanciesSuccess } from '../actions/index';
import NewComponent from '../components/NewComponent';


const mapStateToProps = (state) => {
    return {
        data: state.dep.data
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

const NewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewComponent)

export default NewContainer;