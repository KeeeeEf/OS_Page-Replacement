import {Route, Routes} from "react-router-dom"
import './App.css'

import Home from './components/Home'
import Input from './components/Input'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/input' element={<Input/>}/>
      </Routes>
    </>
  )
}

export default App
