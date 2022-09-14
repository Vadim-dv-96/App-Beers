import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getBeersTC, getBeersWithFoodTC } from '../state/beers-reducer';
import { useState } from 'react';
import { Pagination } from './Pagination';
import { BeersList } from './BeersList';
import { Navigate } from 'react-router-dom';

export function ColorTabs() {
  const [value, setValue] = useState<'All beers' | 'with pizza' | 'with steak'>('All beers');

  const isCurrentBeer = useAppSelector((state) => state.beer.isCurrentBeer);
  debugger;
  const dispatch = useAppDispatch();

  const [pages, setPages] = useState({
    'All beers': 1,
    'with pizza': 1,
    'with steak': 1,
  });
  console.log(pages);

  const changePage = (key: 'All beers' | 'with pizza' | 'with steak', page: number) => {
    setPages((prev) => ({
      ...prev,
      [key]: page,
    }));
    if (key === 'with steak') {
      // dispatch(getNextBeersForSteakTC(page));
      dispatch(getBeersWithFoodTC(page, 'steak'));
    }
    if (key === 'All beers') {
      dispatch(getBeersTC(page));
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: 'All beers' | 'with pizza' | 'with steak') => {
    setValue(newValue);
  };

  // const beerswithPizzaHandler = () => {
  //   dispatch(getBeersWithPizzaTC());
  // };
  const beerswithPizzaHandler = () => {
    dispatch(getBeersWithFoodTC(pages['with pizza'], 'pizza'));
  };
  // const beerswithSteakHandler = () => {
  //   dispatch(getBeersWithSteakTC());
  // };
  const beerswithSteakHandler = () => {
    dispatch(getBeersWithFoodTC(pages['with steak'], 'steak'));
  };
  const allBeersHandler = () => {
    dispatch(getBeersTC(pages['All beers']));
  };

  if (isCurrentBeer) {
    return <Navigate to={'currentBeer'} />;
  }
  debugger;
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Tabs
          centered
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
      <Pagination valueTab={value} pages={pages} changePage={changePage} />
      <BeersList />
    </div>
  );
}
