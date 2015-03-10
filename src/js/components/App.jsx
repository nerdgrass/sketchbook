const React = require('react');
const ActionCreator = require('../actions/HexActionCreators');
const ControlPanel = require('./ControlPanel.jsx');
const SketchCanvas = require('./SketchCanvas.jsx');
const mui = require('material-ui'),
      RaisedButton = mui.RaisedButton;

let App = React.createClass({

  // getInitialState() {
  // },

  handleAddNewClick(e) {

  },

  handleClearListClick(e) {

  },

  render() {
    return (
      <div className="container">
        <ControlPanel></ControlPanel>
        <SketchCanvas id="sketch-canvas"></SketchCanvas>
      </div>
    );
  }

});
// Example of old component implementation.
// <div>
//   // <TaskList tasks={tasks} />
//   // <RaisedButton label="Add Task" primary={true} onClick={this.handleAddNewClick} />
//   // <RaisedButton label="Clear List" secondary={true} onClick={this.handleClearListClick} />
// </div>

module.exports = App;
