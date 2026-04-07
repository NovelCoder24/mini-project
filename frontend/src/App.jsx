import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Gallery from './views/Gallery';
import Dashboard from './views/Dashboard';
import PostItem from './views/PostItem';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="app-layout">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main className="container" style={{ padding: '0 1rem' }}>
          <Routes>
            <Route path="/" element={<Gallery searchQuery={searchQuery} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/post" element={<PostItem />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
