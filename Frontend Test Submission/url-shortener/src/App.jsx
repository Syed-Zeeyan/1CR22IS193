
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import UrlShortenerPage from './pages/UrlShortenerPage.jsx';
import StatsPage from './pages/StatsPage.jsx';
import RedirectHandler from './components/RedirectHandler.jsx';
import { Container } from '@mui/material';
import { Log } from './utils/logger.js'; 

function App() {
  useEffect(() => {
    Log("info", "Application component mounted successfully.");
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Routes>
        <Route path="/" element={<UrlShortenerPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </Container>
  );
}
export default App;