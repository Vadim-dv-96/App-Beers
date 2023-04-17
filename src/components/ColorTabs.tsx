import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { FoodValue, getBeersTC, TabValueType } from '../state/beers-reducer';
import { Pagination } from './Pagination';
import { useMediaQuery } from '@mui/material';

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

  const matches = useMediaQuery('(max-width:600px)');

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <div className="MuiTabs-flexContainer MuiTabs-flexContainerVertical MuiTabs-centered css-6rzvtf-MuiTabs-flexContainer tabsParent">
          <Tabs
            centered
            value={tabValue}
            textColor="inherit"
            indicatorColor="primary"
            aria-label="secondary tabs example"
            orientation={matches ? 'vertical' : 'horizontal'}
          >
            {/* <div className="MuiTabs-flexContainer MuiTabs-flexContainerVertical MuiTabs-centered css-6rzvtf-MuiTabs-flexContainer"> */}
            <Tab onClick={() => beersHandler('All beers')} value="All beers" label="All beers" />
            <Tab onClick={() => beersHandler('with pizza')} value="with pizza" label="Beers that pair with pizza" />
            <Tab onClick={() => beersHandler('with steak')} value="with steak" label="Beers that pair with steak" />
            {/* <span className="MuiTabs-indicator css-10d9dml-MuiTabs-indicator"></span> */}
            {/* </div> */}
          </Tabs>
        </div>
      </Box>
      <Pagination tabValue={tabValue} numberPage={numberPage} />
    </div>
  );
}
