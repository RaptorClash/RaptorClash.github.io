import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Container, Box, IconButton, Button, useMediaQuery } from '@mui/material';import { useState, useMemo, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa6';

import Home from './pages/Home';
import Impressum from './pages/Impressum';
import CookieBanner from './components/CookieBanner';

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode === 'light' || savedMode === 'dark') return savedMode;
    return prefersDarkMode ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', newMode);
      return newMode;
    });
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#6366f1' },
      background: {
        default: mode === 'dark' ? '#0f172a' : '#f8fafc',
        paper: mode === 'dark' ? '#1e293b' : '#ffffff'
      }
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    }
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          
          <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
              <Toolbar disableGutters>
                <Typography 
                  variant="h6" 
                  component={RouterLink} 
                  to="/" 
                  sx={{ flexGrow: 1, textDecoration: 'none', color: 'text.primary', fontWeight: 'bold' }}
                >
                  RaptorClash
                </Typography>
                
                <IconButton onClick={toggleTheme} color="inherit" title="Theme wechseln">
                  {mode === 'dark' ? <FaSun color="#fbbf24" /> : <FaMoon color="#64748b" />}
                </IconButton>
              </Toolbar>
            </Container>
          </AppBar>

          <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 6 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/impressum" element={<Impressum />} />
            </Routes>
          </Container>

          <Box component="footer" sx={{ py: 4, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} RaptorClash. Alle Rechte vorbehalten.
            </Typography>
            <Button component={RouterLink} to="/impressum" size="small" sx={{ mt: 1, color: 'text.secondary' }}>
              Impressum & Datenschutz
            </Button>
          </Box>

          <CookieBanner />
        </Box>
      </Router>
    </ThemeProvider>
  );
}