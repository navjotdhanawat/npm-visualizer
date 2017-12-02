//TodoBoard.js
import React, { Component } from 'react';
import TodoListContainer from '../containers/TodoListContainer';
import TodoFormContainer from '../containers/TodoFormContainer';
import style from '../../style';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { remote, ipcRenderer } from 'electron';
import { HashRouter, Route, Link } from 'react-router-dom'
import Hello from './Hello';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class TodoBoard extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };

        // ipcRenderer.on('execute-close', (event, error, content) => {
        //     console.log(content);
        // });
    }

    componentDidMount() {

    }

    addProject(e) {
        var self = this;
        remote.dialog.showOpenDialog({}, (path) => {
            console.log(path);
            self.path = path[0];
        });
    }

    getPackages(e) {
        ipcRenderer.send('execute', 'directory');
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="NPM Visualizer" />
                            <FontIcon className="muidocs-icon-custom-sort" />
                            <ToolbarSeparator />
                        </ToolbarGroup>

                        <div>
                        </div>
                    </Toolbar>
                    <div>
                        <div>
                            <Route handler={this.path} path="/" component={TodoListContainer} exact />
                            <Route path="/about" component={Hello} exact />
                        </div>
                    </div>

                </div>
            </HashRouter>
        )
    }
}
export default TodoBoard;