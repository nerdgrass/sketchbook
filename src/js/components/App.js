// Dependencies
import React from 'react'

// Components
import { ControlPanel } from './ControlPanel.js'
import { SketchCanvas } from './SketchCanvas.js'

// Component
export const App = (props) => {
  return (
    <div className="container">
      <p>HELLO WORLD</p>
      <ControlPanel></ControlPanel>
      <SketchCanvas></SketchCanvas>
    </div>
  )
}
