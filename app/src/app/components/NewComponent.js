//PackageList.js
import React, { Component } from 'react';
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

class NewComponent extends Component {
    constructor(props) {
        super(props);
        if (this.props.path) {
            this.props.fetchDependancies(this.props.path);
        }

        this.removePackages = this.removePackages.bind(this);
        this.listenEvents();
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps------------------', this.props.path);
        console.log(nextProps);
        if (this.props.path != nextProps.path) {
            this.props.fetchDependancies(nextProps.path);
            console.log('--------------------==========================-----------------------');
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

    listenEvents() {
        var self = this;
        ipcRenderer.on('package-list-close', (event, error, content) => {
            var output = Object.assign(content.output[1], content.output[0]);
            this.props.fetchDependanciesSuccess(output);
        });

        ipcRenderer.on('package-remove-close', (event, error, content) => {
            // self.showSnackbar('Selected packages successfully removed');
            console.log(content);
            // self.getPackages(self.state.path);
            self.props.fetchDependancies(self.props.path);
        });
    }

    render() {
        console.log(this.props);
        const packages  = this.props.data;
        return (
            <div>
                {Object.keys(packages).length ?
                <Paper zDepth={2} style={style.pkgTable}>
                    <div>
                        <RaisedButton onClick={this.updatePackages} label="Update" primary={true} style={style.todoFormButton} />
                        <RaisedButton onClick={this.updatePackagesLatest} label="Latest" primary={true} style={style.todoFormButton} />
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
        );
        // }

    }
}
export default NewComponent;