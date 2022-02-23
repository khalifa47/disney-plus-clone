import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Details from './components/Details';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path='details' element={<Details />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
