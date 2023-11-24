import {Route, Routes} from "react-router-dom"
import './App.css'

import Home from './components/Home'
import { Input } from './components/Input'
import { OptInput } from './components/OptInput'
import { PageReplacement } from './components/PageReplacement'
import { OptPageReplacement } from './components/OptPageReplacement'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/input' element={<Input/>}/>
        <Route path='/optimal-input' element={<OptInput/>}/>
        <Route path='/page-replacement' element={<PageReplacement/>}/>
        <Route path='/opt-page-replacement' element={<OptPageReplacement/>}/>
      </Routes>
    </>
  )
}

export default App
