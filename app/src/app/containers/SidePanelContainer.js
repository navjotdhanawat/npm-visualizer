import { connect } from 'react-redux'
import { fetchDependancies, fetchDependanciesSuccess } from '../actions/index';
import SidePanel from '../components/SidePanel';


const mapStateToProps = (state) => {
    return {
        // data: state.dep
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const SidePanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidePanel)

export default SidePanelContainer;