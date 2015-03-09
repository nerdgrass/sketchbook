const React = require('react');
const Loader = require('react-loader');
const SierpinskiHex = require('./SierpinskiHex.jsx')

let SketchCanvas = React.createClass({
  getInitialState: function() {
    return { loaded: false};
  },

  componentDidMount: function () {
    this.setState({ loaded: true });
  },

  onSuccess: function () {
    //potentially not needed?
  },

  onError: function (err) {
    // error handling goes here
  },

  render() {
    return (
      <div className="sketch-canvas">
        <Loader loaded={this.state.loaded}>
          <SierpinskiHex model={this.state.profile} />
        </Loader>
      </div>
    );
  }
});

module.exports = SketchCanvas;
