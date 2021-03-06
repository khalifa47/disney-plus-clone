import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Details from './components/Details';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/details/:id' element={<Details />} />
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
