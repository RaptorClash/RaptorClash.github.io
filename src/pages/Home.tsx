import { ReactElement, useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button, IconButton, Avatar, Paper, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { GitHubCalendar } from 'react-github-calendar';
import { FaTiktok, FaXTwitter, FaYoutube, FaDiscord, FaGithub } from 'react-icons/fa6';

interface SocialLink {
  name: string;
  icon: ReactElement;
  url: string;
  color: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  owner: { login: string };
  fork: boolean;
  updated_at: string;
  has_pages: boolean;
  homepage: string | null;
}

export default function Home() {
  const currentYear = new Date().getFullYear();
  
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [calendarYear, setCalendarYear] = useState<string>(currentYear.toString());

  const socials: SocialLink[] = [
    { name: 'TikTok', icon: <FaTiktok />, url: 'https://tiktok.com/@RaptorClash', color: '#ff0050' },
    { name: 'Twitter', icon: <FaXTwitter />, url: 'https://twitter.com/RaptorClash', color: '#1DA1F2' },
    { name: 'YouTube', icon: <FaYoutube />, url: 'https://youtube.com/@RaptorClash', color: '#FF0000' },
    { name: 'Discord', icon: <FaDiscord />, url: 'https://discord.com/users/RaptorClash', color: '#5865F2' },
    { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/RaptorClash', color: 'inherit' },
  ];

  useEffect(() => {
    fetch('https://api.github.com/users/RaptorClash/repos?sort=updated&per_page=100')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Repos:", err);
        setLoading(false);
      });
  }, []);

  const myProjects = repos.filter(r => r.owner.login === 'RaptorClash' && !r.fork);
  const contributedProjects = repos.filter(r => r.owner.login !== 'RaptorClash' || r.fork);

  const getWebsiteUrl = (repo: GitHubRepo) => {
    if (repo.homepage) return repo.homepage;
    return `https://${repo.owner.login}.github.io/${repo.name}`;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 6, md: 10 } }}>
      
      <Box sx={{ textAlign: 'center' }}>
        <Avatar 
          src="https://github.com/RaptorClash.png" 
          alt="RaptorClash" 
          sx={{ width: 160, height: 160, mx: 'auto', mb: 3, border: '4px solid', borderColor: 'primary.main', boxShadow: 3 }}
        />
        <Typography variant="h3" gutterBottom sx={{ fontWeight: '900', letterSpacing: '-0.02em' }}>
          RaptorClash
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}>
          Entwickler | Creator <br/>
          Hier findest du meine Projekte, Commits und Socials.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          {socials.map((social) => (
            <IconButton 
              key={social.name} 
              href={social.url} 
              target="_blank"
              title={social.name}
              size="large"
              sx={{ bgcolor: 'background.paper', boxShadow: 1, '&:hover': { color: social.color, transform: 'translateY(-3px)' }, transition: 'all 0.2s' }}
            >
              {social.icon}
            </IconButton>
          ))}
        </Box>
      </Box>

      {/* Eigene Projekte */}
      <Box>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2, fontWeight: 'bold', mb: 4 }}>
          <FaGithub /> Eigene Projekte
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            {myProjects.map((repo) => (
              <Card key={repo.id} variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', borderColor: 'primary.main' } }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 'bold', wordBreak: 'break-word' }}>
                    {repo.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {repo.description || 'Keine Beschreibung vorhanden.'}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, flexWrap: 'wrap', gap: 1 }}>
                  {repo.has_pages ? (
                    <>
                      <Button size="small" href={getWebsiteUrl(repo)} target="_blank" variant="contained" disableElevation>
                        Webseite öffnen
                      </Button>
                      <Button size="small" href={repo.html_url} target="_blank" variant="outlined">
                        Repository
                      </Button>
                    </>
                  ) : (
                    <Button size="small" href={repo.html_url} target="_blank" variant="outlined">
                      Repository ansehen
                    </Button>
                  )}
                </CardActions>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      {!loading && contributedProjects.length > 0 && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Mitgewirkt / Forks
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            {contributedProjects.map((repo) => (
              <Card key={repo.id} variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderStyle: 'dashed' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', wordBreak: 'break-word' }}>
                    {repo.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {repo.description || 'Fork oder externe Mitarbeit.'}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, flexWrap: 'wrap', gap: 1 }}>
                  {repo.has_pages ? (
                    <>
                      <Button size="small" href={getWebsiteUrl(repo)} target="_blank" variant="contained" disableElevation>
                        Webseite öffnen
                      </Button>
                      <Button size="small" href={repo.html_url} target="_blank" variant="outlined">
                        Repository
                      </Button>
                    </>
                  ) : (
                    <Button size="small" href={repo.html_url} target="_blank" variant="outlined">
                      Repository ansehen
                    </Button>
                  )}
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      {/* GitHub Kalender */}
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 4 }, overflowX: 'auto', borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Commit Übersicht
          </Typography>
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="year-select-label">Jahr</InputLabel>
            <Select
              labelId="year-select-label"
              value={calendarYear}
              label="Jahr"
              onChange={(e) => setCalendarYear(e.target.value)}
            >
              {[0, 1, 2, 3].map((offset) => {
                const year = currentYear - offset;
                return (
                  <MenuItem key={year} value={year.toString()}>
                    {year}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minHeight: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <GitHubCalendar 
            username="RaptorClash" 
            year={parseInt(calendarYear)}
            blockSize={14}
            blockMargin={5}
            labels={{
              totalCount: '{{count}} Commits im Jahr {{year}}',
            }}
          />
        </Box>
      </Paper>

    </Box>
  );
}