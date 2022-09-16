import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getCurrentTC } from '../state/beers-reducer';
import '../currentBeer.css';
import { useEffect } from 'react';
import { RequestStatusType } from '../state/app-reducer';
import { CircularProgress } from '@mui/material';

export const CurrentBeer = () => {
  const dispatch = useAppDispatch();
  // const isCurrentBeer = useAppSelector((state) => state.beer.isCurrentBeer);
  const status = useAppSelector<RequestStatusType>((state) => state.api.status);
  const beer = useAppSelector((state) => state.beer.beers);
  // const numberPage = useAppSelector((state) => state.beer.numberPage);

  // const backHandler = () => {
  //   dispatch(backToViewAllBeersTC(numberPage));
  // };

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getCurrentTC(Number(id)));
  }, [dispatch, id]);

  if (status === 'loading') {
    return (
      <div style={{ position: 'fixed', left: '50%', top: '50%', textAlign: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <div className="btn">
        <NavLink style={{ textDecoration: 'none' }} to={'/'}>
          <Button size="medium" variant="outlined">
            Back
          </Button>
        </NavLink>
      </div>

      <div className="container-current-beer">
        {beer.map((beer) => {
          return (
            <Card key={beer.id} className="card-current-beer">
              <div className="content-item-current-beer">
                <div className="card-header-current-beer">
                  <div className="beer-name">{beer.name}</div>
                  <div className="abv">ABV: {beer.abv}</div>
                </div>
                <div className="card-tagline">
                  <p>
                    <span>Tagline:</span> {beer.tagline}{' '}
                  </p>
                </div>
                <div className="card-description">
                  <p> {beer.description} </p>
                </div>
                <div className="card-food_pairing">
                  <p>Food pairing: </p>
                  <ul>
                    {beer.food_pairing.map((f, i) => {
                      return <li key={i}> {f} </li>;
                    })}
                  </ul>
                </div>
              </div>
              <div className="beer-img">
                <img src={beer.image_url} alt="beer-img" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
