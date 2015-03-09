const React = require('react');
const TodoStore = require('../stores/TodoStore');
const ActionCreator = require('../actions/TodoActionCreators');
const ControlPanel = require('./ControlPanel.jsx');
const SketchCanvas = require('./SketchCanvas.jsx');
const mui = require('material-ui'),
      RaisedButton = mui.RaisedButton;

let App = React.createClass({

  getInitialState() {
    return {
      tasks: []
    }
  },

  _onChange() {
    this.setState(TodoStore.getAll());
  },

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  },

  handleAddNewClick(e) {
    let title = prompt('Enter task title:');
    if (title) {
      ActionCreator.addItem(title);
    }
  },

  handleClearListClick(e) {
    ActionCreator.clearList();
  },

  render() {
    let {tasks} = this.state;
    return (
      <div className="container">
        <ControlPanel></ControlPanel>

        <SketchCanvas></SketchCanvas>
        
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
