import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ColorTabs } from './components/ColorTabs';
import { useAppSelector } from './hooks/hooks';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import { CurrentBeer } from './components/CurrentBeer';

function App() {
  const status = useAppSelector((state) => state.api.status);
  const isCurrentBeer = useAppSelector((state) => state.beer.isCurrentBeer);
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

      <Routes>
        <Route
          path="/"
          element={
            <div className="tabs">
              <ColorTabs />
            </div>
          }
        ></Route>
        <Route path="currentBeer" element={<CurrentBeer />}></Route>
      </Routes>
    </Box>
  );
}

export default App;
