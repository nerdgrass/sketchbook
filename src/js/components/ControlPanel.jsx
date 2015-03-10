const React = require('react');
const ActionCreator = require('../actions/HexActionCreators');
const HexStore = require('../stores/HexStore');
const mui = require('material-ui'),
    RaisedButton = mui.RaisedButton;

let ControlPanel = React.createClass({
  getInitialState() {
    return {
      cRadiusMin: 10,
      palette: ["DB60A4", "A43191", "47035C", "F47067" ]
    }
  },

  componentDidMount() {
    console.log(this.state);
  },

  handleAddNewClick(e) {
    ActionCreator.triggerHex(this.state.cRadiusMin, this.state.palette);
  },

  render() {
    return (
      <div className="control-panel">
        <RaisedButton label="Generate" primary={true} onClick={this.handleAddNewClick} />
      </div>
    );
  }
});

module.exports = ControlPanel;
