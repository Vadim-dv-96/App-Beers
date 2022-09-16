import { Card, CircularProgress, FormControl, FormControlLabel, Radio } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { sortBeers } from '../sort/sort';
import { RequestStatusType } from '../state/app-reducer';
import { getBeersTC, sortBeersAC, SortValuesType } from '../state/beers-reducer';
import { BeerItem } from './BeerItem';
import { ColorTabs } from './ColorTabs';

export const BeersList = () => {
  const dispatch = useAppDispatch();
  const numberPage = useAppSelector((state) => state.beer.numberPage);
  const beers = useAppSelector(sortBeers);
  const tabValue = useAppSelector((state) => state.beer.tabValue);
  const sort = useAppSelector<SortValuesType>((state) => state.beer.sort);
  const status = useAppSelector<RequestStatusType>((state) => state.api.status);
  const foodName = useAppSelector((state) => state.beer.food);

  useEffect(() => {
    dispatch(getBeersTC(numberPage[tabValue], tabValue, foodName));
  }, [dispatch]);

  const [value, setValue] = useState(sort);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value as SortValuesType);
    console.log(e.currentTarget.value);
  };

  if (status === 'loading') {
    return (
      <div style={{ position: 'fixed', left: '50%', top: '50%', textAlign: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <ColorTabs />
      <div className="main">
        <Card className="filter">
          <FormControl>
            <div className="filter-heading">Sort Beers</div>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={onChangeHandler}
            >
              <FormControlLabel
                onClick={() => {
                  dispatch(sortBeersAC('Without a filter'));
                }}
                value="Without a filter"
                control={<Radio />}
                label="Without a filter"
              />
              <FormControlLabel
                onClick={() => {
                  dispatch(sortBeersAC('ABV ascending'));
                }}
                value="ABV ascending"
                control={<Radio />}
                label="ABV ascending"
              />
              <FormControlLabel
                onClick={() => {
                  dispatch(sortBeersAC('ABV descending'));
                }}
                value="ABV descending"
                control={<Radio />}
                label="ABV descending"
              />
              <FormControlLabel
                onClick={() => {
                  dispatch(sortBeersAC('A-Z'));
                }}
                value="A-Z"
                control={<Radio />}
                label="A-Z"
              />
              <FormControlLabel
                onClick={() => {
                  dispatch(sortBeersAC('Z-A'));
                }}
                value="Z-A"
                control={<Radio />}
                label="Z-A"
              />
            </RadioGroup>
          </FormControl>
        </Card>
        <div className="beer-list">
          {beers.map((beers) => {
            return <BeerItem key={beers.id} {...beers} />;
          })}
        </div>
      </div>
    </div>
  );
};
