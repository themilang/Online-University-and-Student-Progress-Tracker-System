

import './App.css'
import SignIn from './pages/SignIn';
import {Routes , Route} from 'react-router-dom'

function App() {
 

  return (
    <>

<Routes>
  <Route  path='/' element={<SignIn/>}  />
</Routes>
      

    </>
  )
}

export default App
