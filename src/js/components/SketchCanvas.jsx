const React = require('react');
const ActionCreator = require('../actions/HexActionCreators');
const d3 = require('d3');
const HexStore = require('../stores/HexStore');

let SketchCanvas = React.createClass({

  change() {
    let settings = HexStore.getAll();
    ActionCreator.drawHex(settings.cRadiusMin, settings.palette);
  },

  componentDidMount() {
    HexStore.addChangeListener(this.change);
  },

  componentWillUnmount() {
    HexStore.removeChangeListener(this.change);
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
