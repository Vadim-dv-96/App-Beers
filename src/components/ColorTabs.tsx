import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useAppDispatch } from '../hooks/hooks';
import { getBeersTC, getBeersWithPizzaTC, getBeersWithSteakTC } from '../state/beers-reducer';
import { useState } from 'react';
import { Pagination } from './Pagination';

export function ColorTabs() {
  const [value, setValue] = useState('All beers');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const dispatch = useAppDispatch();

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
          textColor="inherit"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          <Tab onClick={allBeersHandler} value="All beers" label="All beers" />
          <Tab onClick={beerswithPizzaHandler} value="with pizza" label="Beers that pair with pizza" />
          <Tab onClick={beerswithSteakHandler} value="with steak" label="Beers that pair with steak" />
        </Tabs>
      </Box>
      <Pagination valueTab={value} />
    </div>
  );
}
