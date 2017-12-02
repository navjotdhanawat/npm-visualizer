
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TodoBoard from './TodoBoard';


class App extends Component {
    render() {
        return (
            <MuiThemeProvider >
                <TodoBoard />
            </MuiThemeProvider>
        );
    }
}

export default App;
