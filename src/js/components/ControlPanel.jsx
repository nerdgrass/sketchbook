const React = require('react');
const ActionCreator = require('../actions/HexActionCreators');
const mui = require('material-ui'),
    RaisedButton = mui.RaisedButton;

let ControlPanel = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
  },

  handleAddNewClick(e) {
    ActionCreator.triggerHex();
  },

  render() {
    return (
      <div className="control-panel">
        <RaisedButton label="Draw Hexagon" primary={true} onClick={this.handleAddNewClick} />
      </div>
    );
  }
});

module.exports = ControlPanel;
