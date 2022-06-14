import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Counter1, Counter2, } from './ex1/Counter'
import { Stats, SvgRoot } from './ex1/ex2/SvgRoot'

function App() {

  return (
    <>
      <SvgRoot/>
      <Stats/>
    </>
  )
}

export default App
