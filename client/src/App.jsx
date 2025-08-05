import Home from './Components/home';
import React from 'react';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Nav from './Components/Nav';
import Contact from './Components/Contact';
import Login from './auth/Login';
import Signup from './auth/signup';
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import MedicineCRUD from "./Client/MedicineCRUD";

function App() {
  return (
    <Router>
      <Routes>
       <Route path="/api/medications" element={<MedicineCRUD />} />
      <Route path="/" element={<Nav />}>
        <Route index element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/api/auth/login" element={<Login />} />
        <Route path="/api/auth/register" element={<Signup />} />
        <Route path="/api/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/api/auth/reset-password/:token" element={<ResetPassword />} />
      </Route>
      </Routes>
    </Router>
  )
}



export default App
