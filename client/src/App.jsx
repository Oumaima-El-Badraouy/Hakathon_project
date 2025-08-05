import Home from './Components/home';
import React from 'react';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Nav from './Components/Nav';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Nav />}>
        <Route index element={<Home />} />
      </Route>
      </Routes>
    </Router>
  )
}



export default App
