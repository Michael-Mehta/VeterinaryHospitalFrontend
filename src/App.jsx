import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Pets from './components/Pets'
import Vets from './components/Vets'
import Owners from './components/Owners'
import Appointments from './components/Appointments'
import NavigationHeader from './components/NavigationHeader'
function App() {
 

  return (
    <>
     <Router>
      
      <NavigationHeader />

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
