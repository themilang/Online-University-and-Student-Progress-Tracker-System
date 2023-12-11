

import './App.css'
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import {Routes , Route} from 'react-router-dom'

function App() {
 

  return (
    <>

<Routes>
  <Route  path='/' element={<SignIn/>}  />
  <Route  path='/dashboard' element={<Dashboard/>}  />

</Routes>
      

    </>
  )
}

export default App
