import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

export const CurrentBeer = () => {
  return (
    <div className="container">
      <Card className="content">
        <div className="content-item">
          <div className="card-header">
            <div className="beer-name">Beer Name</div>
            <div className="abv">ABV: 8.0</div>
          </div>
          <div className="beer-img">
            <img src={'https://images.punkapi.com/v2/2.png'} alt="beer-img" />
          </div>
        </div>
        <div className="btn">
          <Button size="small" variant="outlined">
            Back
          </Button>
        </div>
      </Card>
    </div>
  );
};
