import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ContextProvider } from './Context/UserContext.jsx'
import './App.css'
import LoginScreen from './Components/User/Login'
import ResetScreen from './Components/User/Reset'
import RegisterScreen from './Components/User/Register'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from './Components/Transaction/Dashboard'
import ShortenUrl from './Components/Transaction/ShortenUrl'
import ActivateEmail from './Components/User/Activate'
import ViewUrl from './Components/Transaction/ViewUrl'

function App() {

  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path='/' Component={LoginScreen} />
          <Route path='/reset' Component={ResetScreen} />
          <Route path='/activate' Component={ActivateEmail} />
          <Route path='/register' Component={RegisterScreen} />
          <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path='/shorten' element={<ProtectedRoute element={<ShortenUrl />} />} />
          <Route path='/view' element={<ProtectedRoute element={<ViewUrl />} />} />
        </Routes>
      </Router>
    </ContextProvider>

  )
}

export default App
