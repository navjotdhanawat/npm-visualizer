import { connect } from 'react-redux'
import { fetchDependancies, fetchDependanciesSuccess } from '../actions/index';
import NewComponent from '../components/NewComponent';


const mapStateToProps = (state) => {
    debugger
    return {
        data: state.dep
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDependancies: () => {
            dispatch(fetchDependancies('/root/Documents/Workspace/npm-visualizer/'));
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