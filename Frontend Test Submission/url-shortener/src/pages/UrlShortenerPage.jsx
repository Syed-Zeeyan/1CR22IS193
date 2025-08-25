import React from 'react';
import { Container, Typography } from '@mui/material';
import UrlShortenerForm from '../components/UrlShortenerForm.jsx'; 

function UrlShortenerPage() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
        URL Shortener
      </Typography>
      <UrlShortenerForm />
      
      {/* This is where you would display the results */}
      {/* For now, just a placeholder */}
      {/* <div>
        <p>Shortened URLs will appear here.</p>
      </div> */}
    </Container>
  );
}

export default UrlShortenerPage;