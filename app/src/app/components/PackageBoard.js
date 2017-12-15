import React, { Component } from 'react';
import PackageListContainer from '../containers/PackageListContainer';
import style from '../../style';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { remote, ipcRenderer } from 'electron';
import { HashRouter, Route, Link } from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NewContainer from '../containers/NewContainer';
import { GridList, Menu, MenuItem, Subheader, Divider, CircularProgress } from 'material-ui';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import { connect } from 'react-redux'

class PackageComponent extends Component {
    constructor(props) {
        super(props);
        var path = Lockr.getAll(true)[0] ? Lockr.getAll(true)[0].path : '';
        this.state = { path: path, data: [], projects: Lockr.getAll(true) || [] };

        ipcRenderer.on('execute-close', (event, error, content) => {
            console.log(content);
        });
        this.selectProject = this.selectProject.bind(this);
        this.addProject = this.addProject.bind(this);
    }

    componentDidMount() {

    }


    selectProject(path, event) {
        this.setState({ path: path });
    }

    addProject(e) {

        var self = this;
        var path = remote.dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        var data = require(`${path[0]}/package.json`);
        var doc = {
            package: data.name || '',
            path: path[0]
        };

        Lockr.set(path[0], doc);
        this.setState({ projects: Lockr.getAll(true), path: path[0], message: '' });
        this.getPackages(path[0]);

    }

    getPackages(e) {
        ipcRenderer.send('execute', 'directory');
    }

    render() {

        return (
            <HashRouter>
                <div>
                    {this.props.loader ?
                    <div>
                        <div style={style.overlay}></div>
                        <CircularProgress size={60} thickness={7} style={style.loader} />
                    </div> : null}
                    <div>
                        <Toolbar>
                            <ToolbarGroup>
                                <ToolbarTitle text="NPM Visualizer" />
                                <FontIcon className="muidocs-icon-custom-sort" />
                                <ToolbarSeparator />
                            </ToolbarGroup>
                        </Toolbar>
                        <div>
                            <GridList cols={8}>
                                <div cols={2}>
                                    <Paper zDepth={2} style={style.leftPanel} value={100}>
                                        <Menu style={style.menuStyle}>
                                            <Subheader>Project List</Subheader>
                                            {this.state.projects && this.state.projects.length ?
                                                this.state.projects.map(function (project, keyIndex) {
                                                    return (
                                                        <MenuItem focusState="focused" onClick={this.selectProject.bind(this, project.path)} primaryText={project.package} key={project.path} />
                                                    )
                                                }, this) : <MenuItem primaryText="No projects added" />}
                                        </Menu>
                                        <Divider />
                                        <div>
                                            <Menu>
                                                <MenuItem onClick={this.addProject} primaryText="Add Project" leftIcon={<PersonAdd />} />
                                                <MenuItem onClick={this.clearProject} primaryText="Clear Projects" leftIcon={<Delete />} />
                                            </Menu>
                                        </div>
                                    </Paper>
                                </div>
                                <div cols={6}>
                                    <Route path="/" exact >
                                        <NewContainer path={this.state.path} />
                                    </Route>
                                </div>
                            </GridList>
                        </div>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loader: state.dep.loader
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const PackageBoard = connect(
    mapStateToProps,
    mapDispatchToProps
)(PackageComponent)


export default PackageBoard;