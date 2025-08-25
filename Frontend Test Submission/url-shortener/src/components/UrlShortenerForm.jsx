import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Link as MuiLink, 
  CircularProgress,
  Grid,
  Stack
} from '@mui/material';
import { Log } from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'shortened-urls';

function UrlShortenerForm() {
  const [longUrl, setLongUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [error, setError] = useState(null);
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
 
    const storedUrls = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setShortenedUrls(storedUrls);
  }, []);

  const handleShorten = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    let validationError = null;
    const urlPattern = new RegExp('^(https?://)?([\da-z.-]+)\.([a-z.]{2,6})[/\w .-]*/?$');

    if (!longUrl) {
      validationError = "Please enter a URL.";
      Log("warn", "URL shortening failed: URL field is empty.");
    } else if (!urlPattern.test(longUrl)) {
      validationError = "Please enter a valid URL.";
      Log("warn", `URL shortening failed: Invalid URL format provided for ${longUrl}`);
    } else if (validity && !Number.isInteger(Number(validity))) {
      validationError = "Validity period must be a whole number.";
      Log("warn", `URL shortening failed: Invalid validity input for ${validity}`);
    }
    
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    const finalValidity = validity === '' ? 30 : Number(validity);
    Log("info", `Shortening URL for ${finalValidity} minutes.`);

    try {

      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      const shortcodeToUse = shortcode || uuidv4().substring(0, 8);
      const mockedApiResponse = {
        originalUrl: longUrl,
        shortenedUrl: `http://localhost:3000/${shortcodeToUse}`,
        expiryDate: new Date(Date.now() + finalValidity * 60000).toISOString(),
        creationDate: new Date().toISOString(),
      };


      const newShortenedUrls = [mockedApiResponse, ...shortenedUrls];
      setShortenedUrls(newShortenedUrls);


      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newShortenedUrls));

      Log("info", `Shortened URL created: ${mockedApiResponse.shortenedUrl}`);
      

      setLongUrl('');
      setValidity('');
      setShortcode('');

    } catch (apiError) {
      Log("error", `API call to shorten URL failed: ${apiError.message}`);
      setError("Something went wrong. Please check the console.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, my: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        URL Shortener
      </Typography>
      <Box component="form" onSubmit={handleShorten} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Enter the URL you want to shorten"
              variant="outlined"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              error={!!error}
              helperText={error}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Validity period (minutes, optional)"
              variant="outlined"
              type="text"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Custom shortcode (optional)"
              variant="outlined"
              value={shortcode}
              onChange={(e) => setShortcode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Shorten URL"}
            </Button>
          </Grid>
        </Grid>
      </Box>


      {shortenedUrls.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Your Shortened URLs
          </Typography>
          <Stack spacing={2}>
            {shortenedUrls.map((url, index) => (
              <Paper key={index} elevation={1} sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Short URL:</Typography>
                  <MuiLink href={url.shortenedUrl} target="_blank" rel="noopener noreferrer" variant="body1">
                    {url.shortenedUrl}
                  </MuiLink>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Original URL:</Typography>
                  <Typography variant="body2">{url.originalUrl}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Created:</Typography>
                  <Typography variant="body2">{new Date(url.creationDate).toLocaleString()}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Expires:</Typography>
                  <Typography variant="body2">{new Date(url.expiryDate).toLocaleString()}</Typography>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Box>
      )}
    </Paper>
  );
}

export default UrlShortenerForm;