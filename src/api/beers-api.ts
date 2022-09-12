import axios from 'axios';
import { BeersType } from '../components/BeerItem';

const instance = axios.create({
  baseURL: 'https://api.punkapi.com/v2/',
});
export const beersApi = {
  getBeers(numbPage: number) {
    return instance.get<Array<BeersType>>(`beers?page=${numbPage}&per_page=15`);
  },
  // getNextBeers(numbPage: number) {
  //   return instance.get<Array<BeersType>>(`beers?page=${numbPage}&per_page=15`);
  // },
  getBeersWithFood(food: string, numbPage: number) {
    return instance.get<Array<BeersType>>(`beers?food=${food}&page=${numbPage}&per_page=15`);
  },
  // getBeersWithPizza() {
  //   return instance.get<Array<BeersType>>('beers?food=pizza&page=1&per_page=15');
  // },
  // getBeersWithSteak() {
  //   return instance.get<Array<BeersType>>('beers?food=steak&page=1&per_page=15');
  // },
  // getNextBeersForPizza(numbPage: number) {
  //   return instance.get<Array<BeersType>>(`beers?food=pizza&page=${numbPage}&per_page=15`);
  // },
  // getNextBeersForSteak(numbPage: number) {
  //   return instance.get<Array<BeersType>>(`beers?food=steak&page=${numbPage}&per_page=15`);
  // },
};
