import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import Destinations from './pages/Destinations';
import Photography from './pages/Photography';
import Blog from './pages/Blog';
import Gear from './pages/Gear';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="story" element={<OurStory />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="photography" element={<Photography />} />
          <Route path="blog" element={<Blog />} />
          <Route path="gear" element={<Gear />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
