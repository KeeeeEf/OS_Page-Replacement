import {Route, Routes} from "react-router-dom"
import './App.css'

import Home from './components/Home'
import { Input } from './components/Input'
import { PageReplacement } from './components/PageReplacement'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/input' element={<Input/>}/>
        <Route path='/page-replacement' element={<PageReplacement/>}/>
      </Routes>
    </>
  )
}

export default App
