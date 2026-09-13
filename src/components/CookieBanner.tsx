import { useState } from 'react';
import { Snackbar, Button, Typography, Paper, Box } from '@mui/material';

export default function CookieBanner() {
  const [open, setOpen] = useState(() => {
    return !localStorage.getItem('cookies-accepted');
  });

  const handleAccept = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Paper elevation={12} sx={{ p: { xs: 3, md: 4 }, maxWidth: 900, backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 4 }}>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            <strong>Hinweis zum Datenschutz:</strong> Diese Webseite speichert selbst keine personenbezogenen Daten, 
            sondern nutzt nur den lokalen Speicher für deine Einstellungen. Da jedoch Dienste von Dritten eingebunden 
            sind (z.B. GitHub-Kalender, Google Drive via PokeVault), könnten durch diese Cookies oder Daten verarbeitet werden.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={handleAccept} 
            sx={{ whiteSpace: 'nowrap', px: 5, py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
          >
            Verstanden
          </Button>
        </Box>
      </Paper>
    </Snackbar>
  );
}