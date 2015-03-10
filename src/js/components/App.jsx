const React = require('react');
const ControlPanel = require('./ControlPanel.jsx');
const SketchCanvas = require('./SketchCanvas.jsx');

let App = React.createClass({

  render() {
    return (
      <div className="container">
        <ControlPanel></ControlPanel>
        <SketchCanvas id="sketch-canvas"></SketchCanvas>
      </div>
    );
  }

});


module.exports = App;
