
import Home from './pages/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SpaceDetail from './pages/SpaceDetail'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import CreateSpace from './pages/CreateSpace'
import EditSpace from './pages/EditSpace'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/space/:uid' element={<SpaceDetail/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create-space' element={<CreateSpace/>}/>
        <Route path='/edit-space' element={<EditSpace/>}/>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App