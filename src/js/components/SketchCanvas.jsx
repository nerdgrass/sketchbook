const React = require('react');
const ActionCreator = require('../actions/HexActionCreators');
const d3 = require('d3');
const HexStore = require('../stores/HexStore');

let SketchCanvas = React.createClass({

  componentDidMount: function () {
    // ActionCreator.triggerHex();
    
    // if (this.props.canvasClear != true ) {
    //   ActionCreator.drawHex();
    // }
  },

  onSuccess: function () {
  },

  onError: function (err) {
    // error handling goes here
  },

  render() {
    return (
      <div className="sketch-canvas">
        <div id="chart" className=""></div>
      </div>
    );
  }
});

module.exports = SketchCanvas;
