const React = require('react');
// const TodoStore = require('../stores/TodoStore');
const HexStore = require('../stores/HexStore');
const ActionCreator = require('../actions/HexActionCreators');
const ControlPanel = require('./ControlPanel.jsx');
const SketchCanvas = require('./SketchCanvas.jsx');
const mui = require('material-ui'),
      RaisedButton = mui.RaisedButton;

let App = React.createClass({

  getInitialState() {
    return {
      canvasClear: true
    };
  },

  fml() {
    // this.setState(HexStore.getAll());
    console.log('on change triggered');
    ActionCreator.drawHex();
  },

  componentDidMount() {
    HexStore.addChangeListener(this.fml);
  },

  componentWillUnmount() {
    HexStore.removeChangeListener(this.fml);
  },

  handleAddNewClick(e) {

  },

  handleClearListClick(e) {

  },

  render() {
    let {canvasClear} = this.state;
    return (
      <div className="container">
        <ControlPanel></ControlPanel>
        <SketchCanvas id="sketch-canvas" canvasClear={this.state.canvasClear}></SketchCanvas>
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
