import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import '../App.css';

export type BeersType = {
  id: number;
  abv: number;
  name: string;
  image_url: string;
  // description: string;
};

export const BeerItem = (props: BeersType) => {
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
          <Button variant="outlined">LEARN MORE</Button>
        </div>
      </Card>
    </div>
  );
};
