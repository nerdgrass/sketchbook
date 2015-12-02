// Dependencies
import React from 'react'
import ActionCreator from '../actions/HexActionCreators'

// Stores
import HexStore from '../stores/HexStore'

// Material UI
import mui from 'material-ui'
const RaisedButton = mui.RaisedButton,
      DropDownMenu = mui.DropDownMenu

let cRadiusMenuItems = [
  { payload: 20, text: 'Huge' },
  { payload: 10, text: 'Big' },
  { payload: 7, text: 'Reasonable' },
  { payload: 5, text: 'Small' },
  { payload: 3, text: 'Tiny' }
];

let paletteMenuItems = [
  {text: 'Cosmic Sunset', payload: ["DB60A4", "A43191", "47035C", "F47067", "7E3674", "BB418C", "FF95BC", "1C0053", "0E0041"]},
  {text: 'Cave Story', payload: ["CCDEF9", "8BA8D5", "204274", "325FA4", "193259"]},
  {text: 'Charcoal', payload: ["494949", "3A3A3A","2B2B2B","4C4C4C","1C1E1D","191919", "2E3332", "292D2C", "212322","202322","191C1B"]},
  {text: 'Rainbow Fruit', payload: ["FF2D55","FF9500","FFCC00","5AC8FA","007AFF","4CD964","FF3B30","8E8E93"]}
];


export class ControlPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = HexStore.getAll();
  }
  handleSelectedcRadius(e, selectedIndex, menuItem) {
    this.setState({cRadiusMin: menuItem.payload})
  }
  handleSelectedPalette(e, selectedIndex, menuItem) {
    this.setState({palette: menuItem.payload})
  }
  handleAddNewClick(e) {
    ActionCreator.triggerHex(this.state.cRadiusMin, this.state.palette)
  }
  render() {
    return (
      <div className="control-panel">
        <h2>Sierpinski Hexagon Generator</h2>

        <label>Color Palette</label>
        <DropDownMenu menuItems={paletteMenuItems} onChange={this.handleSelectedPalette} />

        <label>Minimum Circumradius</label>
        <DropDownMenu menuItems={cRadiusMenuItems} onChange={this.handleSelectedcRadius} />

        <RaisedButton label="Generate" primary={true} onClick={this.handleAddNewClick} />
      </div>
    )
  }
}
