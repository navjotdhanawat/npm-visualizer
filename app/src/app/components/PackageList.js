//PackageList.js
import React, { Component } from 'react';
import style from '../../style';
import * as _ from 'underscore';
import { remote, ipcRenderer } from 'electron';
import {
    RaisedButton, GridList, Paper, List, ListItem, FloatingActionButton, Divider, Menu, MenuItem,
    LinearProgress, CircularProgress, Snackbar, Subheader, TextField
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

class PackageList extends Component {
    constructor(props) {
        super(props);

        this.db = null;
        var path = Lockr.getAll(true)[0] ? Lockr.getAll(true)[0].path : '';

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
        this.updateProject = this.updateProject.bind(this);
        this.updatePackagesLatest = this.updatePackagesLatest.bind(this);
        this.installPackage = this.installPackage.bind(this);
        this.selectedIndexes = [];
    }

    componentWillMount() {
        this.listenEvents();
        if(this.state.path) {
            this.getPackages(this.state.path);
        }
    }

    listenEvents() {
        var self = this;
        ipcRenderer.on('package-list-close', (event, error, content) => {
            var output = Object.assign(content.output[1], content.output[0]);
            self.onCellHoverExit(output);
            self.showSnackbar('Package listing successful');
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

        ipcRenderer.on('package-install-close', (event, error, content) => {
            self.hideLoader();
            if (content.output) {
                self.showSnackbar('Selected packages successfully installed');
                console.log(content);
                self.getPackages(self.state.path);
            } else {
                self.showSnackbar('Selected packages not installed.');
            }
        });

        ipcRenderer.on('package-update-all-close', (event, error, content) => {
            self.showSnackbar('Project updated successfully');
            self.hideLoader();
            console.log(content);
            self.getPackages(self.state.path);
        });

        ipcRenderer.on('get-db-close', (event, error, db) => {
            console.log(db);
        });
    }

    onCellHover(rowNumber, columnId) {
        console.log('on cell hover: ', rowNumber, columnId);
    }

    onCellHoverExit(output) {
        this.setState({ data: output, loading: 'determinate', loader: false,message: '' });
    }

    showLoader() {
        this.setState({ loader: true, message: '' });
    }

    hideLoader() {
        this.setState({ loader: false, message: '' });
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
            packages = (packages.length != 1) ? packages.toString().replace(/,/g, '@latest ') : `${packages.toString()}@latest`;
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
        if (this.state.projects.length) {
            this.showLoader();
            ipcRenderer.send('package-update-all', this.state.path);
        } else {
            this.showSnackbar('Please add project.');
        }
    }

    installPackage() {
        var packages = document.getElementById('pkgToInstall').value;
        if (packages) {
            this.showLoader();
            ipcRenderer.send('package-install', { path: this.state.path, packages: packages });
        } else {
            this.showSnackbar('Please enter package name.');
        }
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
        this.setState({path: path, message: ''});
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
        this.setState({projects: Lockr.getAll(true), path: path[0], message: ''});
        this.getPackages(path[0]);

    }

    selectProject(path,event) {
        // path = btoa(path);
        this.setState({path: path, message: ''});
        this.getPackages(path);
        // window.location.hash = `#/${path}`;
        // return (<Redirect to={`#/${path}`}  />)
    }

    clearProject() {
        Lockr.flush();
        this.setState({path: '', data: {}, projects:[], message: ''});
    }

    render() {
        var packages = this.state.data || {};

        return (
            <div>
                {
                    this.state.message ?
                    <Snackbar
                        open={this.state.snackbar}
                        message={this.state.message}
                        autoHideDuration={this.state.autoHideDuration}
                    /> : null
                }
                {this.state.loader ?
                <div>
                    <div style={style.overlay}></div>
                    <CircularProgress size={60} thickness={7} style={style.loader} />
                </div> : null}
                <LinearProgress mode={this.state.loading} />
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
                            {Object.keys(packages).length ?
                            <Paper zDepth={2} style={style.pkgTable}>
                                <GridList cols={100}>
                                    <div cols={60}>
                                        <RaisedButton onClick={this.updatePackages} label="Update" primary={true} style={style.todoFormButton} />
                                        <RaisedButton onClick={this.updatePackagesLatest} label="Latest" primary={true} style={style.todoFormButton} />
                                        <RaisedButton onClick={this.removePackages} label="Remove" secondary={true} style={style.todoFormButton} />
                                        <RaisedButton onClick={this.updateProject} label="Update Project" primary={true} style={style.todoFormButton} />
                                    </div>
                                    <div cols={40}>
                                        <TextField id="pkgToInstall" hintText="Package name" />
                                        <RaisedButton onClick={this.installPackage} label="Install" primary={true} style={style.todoFormButton} />
                                    </div>
                                </GridList>

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
                                                <TableRowColumn>{packages[keyName].current || packages[keyName].version || (packages[keyName].required && packages[keyName].required.version)}</TableRowColumn>
                                                <TableRowColumn>{packages[keyName].latest || (<span>&#10003;</span>)}</TableRowColumn>
                                                <TableRowColumn>{packages[keyName].wanted || (<span>&#10003;</span>)}</TableRowColumn>
                                            </TableRow>)
                                        }, this)
                                    }
                                    </TableBody>
                                </Table>
                            </Paper> :
                            <Paper zDepth={2} style={style.noProject}>No Project Added</Paper>}
                        </div>
                    </GridList>
                </div>
            </div>
        );
        // }

    }
}
export default PackageList;