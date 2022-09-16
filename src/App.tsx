import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppSelector } from './hooks/hooks';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import { CurrentBeer } from './components/CurrentBeer';
import { BeersList } from './components/BeersList';
import { RequestStatusType } from './state/app-reducer';

function App() {
  const status = useAppSelector<RequestStatusType>((state) => state.api.status);

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
        <Route path="/" element={<BeersList />}></Route>
        <Route path="currentBeer/:id" element={<CurrentBeer />}></Route>
      </Routes>
    </Box>
  );
}

export default App;
