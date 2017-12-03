//TodoList.js
import React, { Component } from 'react';
import Todo from './Todo';
import style from '../../style';
import * as _ from 'underscore';
import { remote, ipcRenderer } from 'electron';
import {
    RaisedButton, GridList, Paper, List, ListItem, FloatingActionButton, Divider, Menu, MenuItem,
    LinearProgress, CircularProgress, Snackbar, Subheader
} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
import  { Redirect } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableHeaderColumn,
    TableRowColumn
} from 'material-ui/Table';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import TodoContainer from '../containers/TodoContainer';
var Datastore = require('nedb')
    , db = new Datastore();
console.log(`${__dirname}/electron.db`)
const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
    },
    titleStyle: {
        color: 'rgb(0, 188, 212)',
    },
};

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.db = null;
        var path = Lockr.getAll(true)[0] ? Lockr.getAll(true)[0].path : '';
        // this.props.fetchDependancies(path);
        debugger
        this.state = {
            dep: {},
            data: [],
            loading: 'indeterminate',
            path: path,
            loader: path ? true : false,
            snackbar: false,
            autoHideDuration: 3000,
            message: '',
            projects: Lockr.getAll(true) || []
        };
        this.onCellHoverExit = this.onCellHoverExit.bind(this);
        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.updatePackages = this.updatePackages.bind(this);
        this.addProject = this.addProject.bind(this);
        this.removePackages = this.removePackages.bind(this);
        this.selectProject = this.selectProject.bind(this);
        this.clearProject = this.clearProject.bind(this);

        if(path) {
            this.getPackages(this.state.path);
        }

        this.selectedIndexes = [];
        // ipcRenderer.send('get-db');
    }

    componentWillMount() {
        this.listenEvents();
        // this.getPackages();
    }

    listenEvents() {
        var self = this;
        ipcRenderer.on('package-list-close', (event, error, content) => {

            var output = Object.assign(content.output[1], content.output[0]);
            self.onCellHoverExit(output);
            self.showSnackbar('Outdated packages listing');
            self.props.fetchDependanciesSuccess(content);
        });
        ipcRenderer.on('package-update-close', (event, error, content) => {
            self.hideLoader();
            self.showSnackbar('Selected packages successfully updated');
            console.log(content);
            self.getPackages(self.state.path);
        });

        ipcRenderer.on('package-latest-close', (event, error, content) => {
            self.hideLoader();
            self.showSnackbar('Selected packages successfully updated');
            console.log(content);
            self.getPackages(self.state.path);
        });

        ipcRenderer.on('package-remove-close', (event, error, content) => {
            self.hideLoader();
            self.showSnackbar('Selected packages successfully removed');
            console.log(content);
            self.getPackages(self.state.path);
        });

        ipcRenderer.on('package-update-all-close', (event, error, content) => {
            self.showSnackbar('Project updated successfully');
            self.hideLoader();
            console.log(content);
        });

        ipcRenderer.on('get-db-close', (event, error, db) => {
            console.log(db);
            // self.db = db;

        });
    }

    onCellHover(rowNumber, columnId) {
        console.log('on cell hover: ', rowNumber, columnId);
    }

    onCellHoverExit(output) {
        this.setState({ data: output, loading: 'determinate', loader: false });
    }

    showLoader() {
        this.setState({ loader: true });
    }

    hideLoader() {
        this.setState({ loader: false });
    }

    getPackages(path) {
        this.showLoader();
        ipcRenderer.send('package-list', path);
    }

    updatePackages() {
        if (this.selectedIndexes.length) {
            this.showLoader();
            var packages = [];
            this.selectedIndexes.forEach(function (index) {
                packages.push(Object.keys(this.state.data)[index]);
            }, this);
            packages = packages.toString().replace(/,/g, ' ');
            ipcRenderer.send('package-update', { path: this.state.path, packages: packages });
        } else {
            this.showSnackbar('Please select package');
        }
    }

    updatePackagesLatest() {
        if (this.selectedIndexes.length) {
            this.showLoader();
            var packages = [];
            this.selectedIndexes.forEach(function (index) {
                packages.push(Object.keys(this.state.data)[index]);
            }, this);
            packages = packages.toString().replace(/,/g, '@latest ');
            ipcRenderer.send('package-latest', { path: this.state.path, packages: packages });
        } else {
            this.showSnackbar('Please select package');
        }
    }

    removePackages() {
        if (this.selectedIndexes.length) {
            this.showLoader();
            var packages = [];
            this.selectedIndexes.forEach(function (index) {
                packages.push(Object.keys(this.state.data)[index]);
            }, this);
            packages = packages.toString().replace(/,/g, ' ');
            ipcRenderer.send('package-remove', { path: this.state.path, packages: packages });
        } else {
            this.showSnackbar('Please select package');
        }
    }

    updateProject() {
        this.showLoader();
        ipcRenderer.send('package-update-all', this.state.path);
    }



    handleRowSelection(selected) {
        this.selectedIndexes = selected;
    }

    showSnackbar(message) {
        this.setState({
            snackbar: true,
            message: message
        });
    }

    addProject(e) {
        var path = '/Users/navjot/Documents/workplace/wingify/web-server';
        this.setState({path: path});
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
        this.setState({projects: Lockr.getAll(true), path: path[0]});
        this.getPackages(path[0]);

    }

    selectProject(path,event) {
        // path = btoa(path);
        debugger
        this.setState({path: path});
        this.getPackages(path);
        // window.location.hash = `#/${path}`;
        // return (<Redirect to={`#/${path}`}  />)
    }

    clearProject() {
        Lockr.flush();
        this.setState({path: '', data: {}, projects:[]});
    }

    render() {
        var packages = this.state.data || {};

        return (
            <div>
                <Snackbar
                    open={this.state.snackbar}
                    message={this.state.message}
                    autoHideDuration={this.state.autoHideDuration}
                />
                {this.state.loader ?
                <div>
                    <div style={style.overlay}></div>
                    <CircularProgress size={60} thickness={7} style={style.loader} />
                </div> : null}
                <LinearProgress mode={this.state.loading} />
                <div>
                    <GridList cols={8}>
                        <div cols={3}>
                            <Paper zDepth={2} style={style.leftPanel} value={100}>
                                <Menu>
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
                        <div cols={5}>
                            <Paper zDepth={2} style={style.pkgTable}>
                                <div>
                                    <RaisedButton onClick={this.updatePackages} label="Update" primary={true} style={style.todoFormButton} />
                                    <RaisedButton label="Latest" primary={true} style={style.todoFormButton} />
                                    <RaisedButton onClick={this.removePackages} label="Remove" secondary={true} style={style.todoFormButton} />
                                    <RaisedButton onClick={this.updateProject} label="Update Project" primary={true} style={style.todoFormButton} />
                                </div>

                                <Table multiSelectable={true} onRowSelection={this.handleRowSelection}>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHeaderColumn>Sr No.</TableHeaderColumn>
                                            <TableHeaderColumn>Package Name</TableHeaderColumn>
                                            <TableHeaderColumn>Current Version</TableHeaderColumn>
                                            <TableHeaderColumn>Latest Version</TableHeaderColumn>
                                            <TableHeaderColumn>Wanted Version</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody deselectOnClickaway={false}>{
                                        Object.keys(packages).map(function (keyName, keyIndex) {
                                            return (<TableRow key={keyName}>
                                                <TableRowColumn>{keyIndex + 1}</TableRowColumn>
                                                <TableRowColumn>{keyName}</TableRowColumn>
                                                <TableRowColumn>{packages[keyName].current || packages[keyName].version}</TableRowColumn>
                                                <TableRowColumn>{packages[keyName].latest || (<span>&#10003;</span>)}</TableRowColumn>
                                                <TableRowColumn>{packages[keyName].wanted || (<span>&#10003;</span>)}</TableRowColumn>
                                            </TableRow>)
                                        }, this)
                                    }
                                    </TableBody>
                                </Table>
                            </Paper>
                        </div>
                    </GridList>
                </div>
            </div>
        );
        // }

    }
}
export default TodoList;