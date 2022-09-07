import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getBeersTC } from '../state/beers-reducer';
import { BeerItem } from './BeerItem';
import Pagination from './Pagination';

export const BeersList = () => {
  const dispatch = useAppDispatch();

  const beers = useAppSelector((state) => state.beers);

  useEffect(() => {
    dispatch(getBeersTC());
  }, [dispatch]);

  // const nextPageHandler = (pageNumb: number) => {
  //   // dispatch(getNextBeersTC())
  // };

  return (
    <>
      <div>
        <Pagination />
      </div>
      <div className="main">
        <div className="filter">FILTER</div>
        <div className="beer-list">
          {beers.map((beers) => {
            return <BeerItem key={beers.id} {...beers} />;
          })}
        </div>
      </div>
    </>
  );
};
