import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { NavLink } from 'react-router-dom';
import '../App.css';

type MaltType = {
  name: string;
  amount: { value: number; unit: string };
};
type HopsType = {
  name: string;
  amount: { value: number; unit: string };
  add: string;
  attribute: string;
};
type Mash_tempType = {
  temp: { value: number; unit: string };
  duration: number;
};
export type BeersType = {
  id: number;
  name: string;
  abv: number;
  image_url: string;
  description: string;
  attenuation_level: number;
  boil_volume: { value: number; unit: string };
  brewers_tips: string;
  contributed_by: string;
  ebc: number;
  first_brewed: string;
  food_pairing: string[];
  ibu: number;
  ingredients: { malt: Array<MaltType>; hops: Array<HopsType>; yeast: string };
  method: {
    fermentation: {
      temp: {
        value: number;
        unit: string;
      };
    };
    mash_temp: Array<Mash_tempType>;
    twist: null;
  };
  ph: number;
  srm: number;
  tagline: string;
  target_fg: number;
  target_og: number;
};

export const BeerItem = (props: BeersType) => {
  // const learnMoreHandler = (beerId: number) => {
  //   dispatch(getCurrentTC(beerId));
  // };

  return (
    <div className="container">
      <Card className="content">
        <div className="content-item">
          <div className="card-header">
            <div className="beer-name">{props.name}</div>
            <div className="abv">ABV: {props.abv}</div>
          </div>
          <div className="beer-img">
            <img src={props.image_url} alt="beer-img" />
          </div>
        </div>
        <div className="btn">
          <NavLink style={{ textDecoration: 'none' }} to={`/currentBeer/${props.id}`}>
            <Button size="small" variant="outlined">
              LEARN MORE
            </Button>
          </NavLink>
        </div>
      </Card>
    </div>
  );
};
