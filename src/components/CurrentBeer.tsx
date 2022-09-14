import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { backToViewAllBeersTC } from '../state/beers-reducer';
import '../currentBeer.css';

export const CurrentBeer = () => {
  const dispatch = useAppDispatch();
  const isCurrentBeer = useAppSelector((state) => state.beer.isCurrentBeer);
  const beers = useAppSelector((state) => state.beer.beers);
  const numberPage = useAppSelector((state) => state.beer.numberPage);

  const backHandler = () => {
    dispatch(backToViewAllBeersTC(numberPage));
  };

  if (!isCurrentBeer) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <div className="btn">
        <Button
          onClick={() => {
            backHandler();
          }}
          size="medium"
          variant="outlined"
        >
          Back
        </Button>
      </div>
      <div className="container-current-beer">
        {beers.map((beer) => {
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
                    {beer.food_pairing.map((f) => {
                      return <li> {f} </li>;
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
    </>
  );
};
