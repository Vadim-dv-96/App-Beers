import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { FoodValue, getBeersTC, TabValueType } from '../state/beers-reducer';
import { Pagination } from './Pagination';

export function ColorTabs() {
  const tabValue = useAppSelector<TabValueType>((state) => state.beer.tabValue);
  const numberPage = useAppSelector<{ [key in TabValueType]: number }>((state) => state.beer.numberPage);

  const dispatch = useAppDispatch();

  const getBeerKey: { [key in TabValueType]: FoodValue } = {
    'All beers': null,
    'with pizza': 'pizza',
    'with steak': 'steak',
  };
  const beersHandler = (type: TabValueType) => {
    dispatch(getBeersTC(numberPage[type], type, getBeerKey[type]));
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
          textColor="inherit"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          <Tab onClick={() => beersHandler('All beers')} value="All beers" label="All beers" />
          <Tab onClick={() => beersHandler('with pizza')} value="with pizza" label="Beers that pair with pizza" />
          <Tab onClick={() => beersHandler('with steak')} value="with steak" label="Beers that pair with steak" />
        </Tabs>
      </Box>
      <Pagination tabValue={tabValue} numberPage={numberPage} />
    </div>
  );
}
