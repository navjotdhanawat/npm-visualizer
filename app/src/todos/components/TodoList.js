//TodoList.js
import React, { Component } from 'react';
import Todo from './Todo';
import style from '../../style';
import * as _ from 'underscore';
import { remote, ipcRenderer } from 'electron';
import {
    RaisedButton, GridList, Paper, List, ListItem, FloatingActionButton, Divider, Menu, MenuItem,
    LinearProgress, CircularProgress, Snackbar
} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
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
        var path = '/root/Documents/Workspace/vouchdog';
        this.state = {
            data: {},
            loading: 'indeterminate',
            path: path,
            loader: true,
            snackbar: false,
            autoHideDuration: 3000,
            message: ''
        };
        this.onCellHoverExit = this.onCellHoverExit.bind(this);
        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.updatePackages = this.updatePackages.bind(this);
        this.getPackages(path);
        this.selectedIndexes = [];
    }

    componentWillMount() {
        this.listenEvents();
        // this.getPackages();
    }

    listenEvents() {
        var self = this;
        ipcRenderer.on('package-list-close', (event, error, content) => {
            self.onCellHoverExit(content.output);
            self.showSnackbar('Outdated packages listing');
        });
        ipcRenderer.on('package-update-close', (event, error, content) => {
            self.hideLoader();
            self.showSnackbar('Selected packages successfull updated');
            console.log(content);
        });

        ipcRenderer.on('package-update-all-close', (event, error, content) => {
            self.showSnackbar('Project updated successfully');
            self.hideLoader();
            console.log(content);
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
        ipcRenderer.send('package-list', path);
    }

    updatePackages() {
        this.showLoader();
        var packages = [];
        this.selectedIndexes.forEach(function(index) {
            packages.push(Object.keys(this.state.data)[index]);
        }, this);
        packages = packages.toString().replace(/,/g, ' ');
        ipcRenderer.send('package-update', {path: this.state.path, packages: packages});
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

    render() {
        var packages = this.state.data;

        return (
            <div>
                <Snackbar
                    open={this.state.snackbar}
                    message={this.state.message}
                    autoHideDuration={this.state.autoHideDuration}
                />
                {this.state.loader ? <CircularProgress size={60} thickness={7} style={style.loader}/> : null}
                <LinearProgress mode={this.state.loading} />
                <div>
                    <GridList cols={4}>
                        <div cols={1}>
                            <Paper zDepth={2} style={style.todoBoard} value={100}>
                                <List>
                                    <ListItem primaryText="Project 1" />
                                    <ListItem primaryText="Project 2" />
                                    <ListItem primaryText="Project 3" />
                                </List>
                                <Divider />
                                <div>
                                    <Menu>
                                        <MenuItem primaryText="Add Project" leftIcon={<PersonAdd />} />
                                        <MenuItem primaryText="Clear" leftIcon={<Delete />} />
                                    </Menu>
                                </div>
                            </Paper>
                        </div>
                        <div cols={3}>
                            <Paper zDepth={2} style={style.pkgTable}>
                                <div>
                                    <RaisedButton onClick={this.updatePackages} label="Update" primary={true} style={style.todoFormButton} />
                                    <RaisedButton label="Latest" primary={true} style={style.todoFormButton} />
                                    <RaisedButton label="Remove" secondary={true} style={style.todoFormButton} />
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
                                                <TableRowColumn>{keyIndex}</TableRowColumn>
                                                <TableRowColumn>{keyName}</TableRowColumn>
                                                <TableRowColumn>{packages[keyName].current}</TableRowColumn>
                                                <TableRowColumn>{packages[keyName].latest}</TableRowColumn>
                                                <TableRowColumn>{packages[keyName].wanted}</TableRowColumn>
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