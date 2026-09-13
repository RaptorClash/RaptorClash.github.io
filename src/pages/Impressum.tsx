import { Box, Typography, Paper, Link as MuiLink, Stack } from '@mui/material';
import { FaEnvelope, FaTiktok, FaXTwitter, FaYoutube, FaDiscord } from 'react-icons/fa6';

export default function Impressum() {
  return (
    <Paper variant="outlined" sx={{ p: { xs: 3, md: 6 }, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
        Impressum
      </Typography>

      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
        
        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Angaben
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Marvin
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Kontakt
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
            <FaEnvelope color="#90caf9" />
            <MuiLink href="mailto:raptorclash1410@gmail.com" underline="hover" color="text.secondary">
              raptorclash1410@gmail.com
            </MuiLink>
          </Stack>

          <Typography variant="subtitle2" gutterBottom>Social Media Profile:</Typography>
          <Stack spacing={1} color="text.secondary">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><FaTiktok /> TikTok: RaptorClash</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><FaXTwitter /> Twitter: RaptorClash</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><FaYoutube /> YouTube: RaptorClash</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><FaDiscord /> Discord: RaptorClash</Box>
          </Stack>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Haftungsausschluss
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit 
            und Aktualität der Inhalte kann ich jedoch keine Gewähr übernehmen. Mein Angebot enthält Links zu externen 
            Webseiten Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden 
            Inhalte auch keine Gewähr übernehmen.
          </Typography>
        </Box>

      </Box>
    </Paper>
  );
}