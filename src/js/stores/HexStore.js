const AppDispatcher = require('../dispatchers/AppDispatcher');
const Constants = require('../constants/AppConstants');
const BaseStore = require('./BaseStore');
const assign = require('object-assign');

// data storage
let hexSettings = {
  cRadiusMin: 20,
  palette: ["DB60A4", "A43191", "47035C", "F47067", "7E3674", "BB418C", "FF95BC", "1C0053", "0E0041"]
};

// add private functions to modify data

function updateHexSettings(cRadiusNew, paletteNew) {
  hexSettings.cRadiusMin = cRadiusNew;
  hexSettings.palette = paletteNew;
};

// Facebook style store creation.
let HexStore = assign({}, BaseStore, {

  // public methods used by Controller-View to operate on data
  getAll() {
    return hexSettings;
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.TRIGGER_HEX:
        let palette = action.palette;
        let cRadiusMin = action.cRadiusMin;
        updateHexSettings(cRadiusMin, palette);

        // NOTE: if this action needs to wait on another store:
        // AppDispatcher.waitFor([OtherStore.dispatchToken]);
        // For details, see: http://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html#why-we-need-a-dispatcher
        HexStore.emitChange();
        console.log('TRIGGER_HEX activated in HexStore');
        console.log('palette: ' + palette);

        break;

      case Constants.ActionTypes.UPDATE_HEX:
        break;
    }
  })

});

module.exports = HexStore;
