const AppDispatcher = require('../dispatchers/AppDispatcher');
const Constants = require('../constants/AppConstants');
const BaseStore = require('./BaseStore');
const assign = require('object-assign');

// data storage
let defaultCanvasClear = true;

// add private functions to modify data

function canvasOn() {
  defaultCanvasClear = false;
  console.log('canvasOn called');
}

// Facebook style store creation.
let HexStore = assign({}, BaseStore, {

  // public methods used by Controller-View to operate on data
  getAll() {
    return {
      canvasClear: defaultCanvasClear
    };
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.TRIGGER_HEX:
        // let text = action.text.trim();

        // NOTE: if this action needs to wait on another store:
        // AppDispatcher.waitFor([OtherStore.dispatchToken]);
        // For details, see: http://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html#why-we-need-a-dispatcher
        HexStore.emitChange();
        console.log('TRIGGER_HEX activated in HexStore');

        break;

      // add more cases for other actionTypes...
    }
  })

});

module.exports = HexStore;
