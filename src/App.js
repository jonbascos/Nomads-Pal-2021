import React from 'react'
import './static/scripts/firebase'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import {useAuth} from './static/scripts/firebase'

// styles
import './styles/App.css';

// Components
import Navbar from './components/Navbar'
import Home from './components/pages/Home';
import Contact from './components/pages/Contact'
import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import AddLocation from './components/pages/AddLocation'

function App() {
  const currentUser = useAuth()
  
  
  return(
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/newlocation' element={currentUser && currentUser.email === process.env.REACT_APP_FIREBASE_EMAIL_CHECK ? <AddLocation /> : <Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/signin' element={<SignIn />}/>
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
