import axios from 'axios';
import { BeersType } from '../components/BeerItem';

const instance = axios.create({
  baseURL: 'https://api.punkapi.com/v2/',
});
export const beersApi = {
  getBeers() {
    return instance.get<Array<BeersType>>('beers?page=1&per_page=20');
  },
  getBeersWithPizza() {
    return instance.get<Array<BeersType>>('beers?food=pizza&page=1&per_page=20');
  },
  getBeersWithSteak() {
    return instance.get<Array<BeersType>>('beers?food=steak&page=1&per_page=25');
  },
};
