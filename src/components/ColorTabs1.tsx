import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { FoodValue, getBeersTC, TabValueType } from '../state/beers-reducer';
import { useState } from 'react';
import { Pagination } from './Pagination';

export function ColorTabs1() {
  const tabValue = useAppSelector<TabValueType>((state) => state.beer.tabValue);
  console.log(tabValue);
  // const [value, setValue] = useState<'All beers' | 'with pizza' | 'with steak'>(tabValue);
  // console.log(value);

  // const handleChange = (event: React.SyntheticEvent, newValue: 'All beers' | 'with pizza' | 'with steak') => {
  //   setValue(newValue);
  // };

  // const isCurrentBeer = useAppSelector((state) => state.beer.isCurrentBeer);

  const dispatch = useAppDispatch();

  const [pages, setPages] = useState<{ [key in TabValueType]: number }>({
    'All beers': 1,
    'with pizza': 1,
    'with steak': 1,
  });
  console.log(pages);

  const changePage = (key: TabValueType, page: number) => {
    console.log(page);

    setPages((prev) => ({
      ...prev,
      [key]: page,
    }));
    if (key === 'with steak') {
      dispatch(getBeersTC(page, 'with steak', 'steak'));
    }
    if (key === 'All beers') {
      dispatch(getBeersTC(page, 'All beers', null));
    }
  };
  const getBeerKey: { [key in TabValueType]: FoodValue } = {
    'All beers': null,
    'with pizza': 'pizza',
    'with steak': 'steak',
  };
  const beersHandler = (type: TabValueType) => {
    dispatch(getBeersTC(pages[type], type, getBeerKey[type]));
  };

  // const beerswithPizzaHandler = () => {
  //   dispatch(getBeersTC(pages['with pizza'], 'with pizza', 'pizza'));
  // };

  // const beerswithSteakHandler = () => {
  //   dispatch(getBeersTC(pages['with steak'], 'with steak', 'steak'));
  // };
  // const allBeersHandler = () => {
  //   dispatch(getBeersTC(pages['All beers'], 'All beers', null));
  // };

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Tabs
          centered
          value={tabValue}
          // onChange={handleChange}
          textColor="inherit"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          <Tab onClick={() => beersHandler('All beers')} value="All beers" label="All beers" />
          <Tab onClick={() => beersHandler('with pizza')} value="with pizza" label="Beers that pair with pizza" />
          <Tab onClick={() => beersHandler('with steak')} value="with steak" label="Beers that pair with steak" />
        </Tabs>
      </Box>
      {/* <Pagination valueTab={tabValue} pages={pages} changePage={changePage} /> */}
    </div>
  );
}
