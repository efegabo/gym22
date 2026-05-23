import { StrictMode } from 'react'
 import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthLogin from './pages/authLogin.jsx';
import AuthRegister from './pages/authRegister.jsx';
import NotFound from './pages/notFound.jsx';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<AuthLogin />} />
          <Route path='/register' element={<AuthRegister />} />
         <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>  
  </StrictMode>,
)
