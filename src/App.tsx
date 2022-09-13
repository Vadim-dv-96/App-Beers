import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ColorTabs } from './components/ColorTabs';
import { useAppSelector } from './hooks/hooks';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { CurrentBeer } from './components/CurrentBeer';

function App() {
  const status = useAppSelector((state) => state.api.status);

  //dark mode for AppBar
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" style={{ color: '#626c48' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Beers
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      {status === 'loading' && <LinearProgress />}
      {/* <CurrentBeer /> */}
      <div className="tabs">
        <ColorTabs />
      </div>
    </Box>
  );
}

export default App;
