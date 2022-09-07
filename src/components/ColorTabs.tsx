import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useAppDispatch } from '../hooks/hooks';
import { getBeersTC, getBeersWithPizzaTC, getBeersWithSteakTC } from '../state/beers-reducer';

export function ColorTabs() {
  const [value, setValue] = React.useState('one');
  const dispatch = useAppDispatch();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const beerswithPizzaHandler = () => {
    dispatch(getBeersWithPizzaTC());
  };
  const beerswithSteakHandler = () => {
    dispatch(getBeersWithSteakTC());
  };
  const allBeersHandler = () => {
    dispatch(getBeersTC());
  };
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          <Tab onClick={allBeersHandler} value="one" label="All beers" />
          <Tab onClick={beerswithPizzaHandler} value="two" label="Beers that pair with pizza" />
          <Tab onClick={beerswithSteakHandler} value="three" label="Beers that pair with steak" />
        </Tabs>
      </Box>
    </div>
  );
}
