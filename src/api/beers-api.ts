import axios from 'axios';
import { BeersType } from '../components/BeerItem';
import { FoodValue } from '../state/beers-reducer';

const instance = axios.create({
  baseURL: 'https://api.punkapi.com/v2/',
});
export const beersApi = {
  // getBeers(numbPage: number) {
  //   return instance.get<Array<BeersType>>(`beers?page=${numbPage}&per_page=15`);
  // },
  // getBeersWithFood(food: string, numbPage: number) {
  //   return instance.get<Array<BeersType>>(`beers?food=${food}&page=${numbPage}&per_page=15`);
  // },
  getBeers(numbPage: number, food: FoodValue | null) {
    if (food) {
      return instance.get<Array<BeersType>>(`beers?food=${food}&page=${numbPage}&per_page=15`);
    } else {
      return instance.get<Array<BeersType>>(`beers?page=${numbPage}&per_page=15`);
    }
  },
  getCurrentBeer(beerId: number) {
    return instance.get<Array<BeersType>>(`beers/${beerId}`);
  },
};
