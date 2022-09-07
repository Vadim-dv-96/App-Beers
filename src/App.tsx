import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { BeersList } from './components/BeersList';
import { ColorTabs } from './components/ColorTabs';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Beers
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="tabs">
        <ColorTabs />
      </div>
      <BeersList />
    </Box>
  );
}

export default App;
