import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */

const customContentStyle = {
  width: '80%',
  maxWidth: 'none',
};

export default class DialogExampleSimple extends React.Component {
    constructor() {
      super();
        this.state = {
            open: false,
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

  handleOpen(){
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Dialog" onClick={this.handleOpen.bind(this)} />
        <Dialog
          title="Dialog With Actions"
          contentStyle={customContentStyle}
          modal={true}
          open={this.state.open}
          autoDetectWindowHeight={true} >
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.
          The actions in this window were passed in as an array of React objects.

        </Dialog>
      </div>
    );
  }
}