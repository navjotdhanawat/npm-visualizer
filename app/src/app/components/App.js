
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PackageBoard from './PackageBoard';


class App extends Component {
    render() {
        return (
            <MuiThemeProvider >
                <PackageBoard />
            </MuiThemeProvider>
        );
    }
}

export default App;
