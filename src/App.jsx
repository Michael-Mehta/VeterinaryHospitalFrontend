import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Pets from './components'
import Vets from './components'
import Owners from './components'
import Appointments from './components'

function App() {
 

  return (
    <>
     <Router>
      <h1>Vite + React</h1>

      <Routes>
        <Route path = "/pets" element={<Pets />}/>
        <Route path = "/vets" element={<Vets />}/>
        <Route path = "/owners" element={<Owners />}/>
        <Route path = "/appointments" element={<Appointments />}/>
      </Routes>
     </Router>
      
      
    </>
  )
}

export default App
