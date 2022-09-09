import { Card, FormControl, FormControlLabel, Radio } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getBeersTC } from '../state/beers-reducer';
import { BeerItem } from './BeerItem';

export const BeersList = () => {
  const dispatch = useAppDispatch();

  const beers = useAppSelector((state) => state.beers);

  const [value, setValue] = useState('Without a filter');

  useEffect(() => {
    dispatch(getBeersTC());
  }, [dispatch]);

  // const nextPageHandler = (pageNumb: number) => {
  //   dispatch(getNextBeersTC(pageNumb));
  // };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  return (
    <>
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
              <FormControlLabel value="Without a filter" control={<Radio />} label="Without a filter" />
              <FormControlLabel value="ABV ascending" control={<Radio />} label="ABV ascending" />
              <FormControlLabel value="ABV descending" control={<Radio />} label="ABV descending" />
              <FormControlLabel value="A-Z" control={<Radio />} label="A-Z" />
              <FormControlLabel value="Z-A" control={<Radio />} label="Z-A" />
            </RadioGroup>
          </FormControl>
          {/* <div className="filter-ascending">
            <input style={{ marginRight: '10px' }} type="radio" name="radio" />
            ABV ascending
          </div>
          <div className="filter-descending">
            <input style={{ marginRight: '10px' }} type="radio" name="radio" />
            ABV descending
          </div>
          <div className="filter-A-Z">
            <input style={{ marginRight: '10px' }} type="radio" name="radio" />
            A-Z
          </div>
          <div className="filter-Z-A"><input style={{ marginRight: '10px' }} type="radio" name="radio" />Z-A</div> */}
        </Card>
        <div className="beer-list">
          {beers.map((beers) => {
            return <BeerItem key={beers.id} {...beers} />;
          })}
        </div>
      </div>
    </>
  );
};
