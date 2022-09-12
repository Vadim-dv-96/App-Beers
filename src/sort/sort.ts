import { BeersType } from '../components/BeerItem';
import { AppRootStateType } from '../state/store';

export const sortBeers = (state: AppRootStateType): Array<BeersType> => {
  const rootState = [...state.beer.beers];
  const sortValue = state.beer.sort;
  if (sortValue === 'ABV ascending') {
    rootState.sort((a, b) => (a.abv < b.abv ? 1 : -1));
  } else if (sortValue === 'ABV descending') {
    rootState.sort((a, b) => (a.abv > b.abv ? 1 : -1));
  } else if (sortValue === 'A-Z') {
    rootState.sort((a, b) => (a.name > b.name ? 1 : -1));
  } else if (sortValue === 'Z-A') {
    rootState.sort((a, b) => (a.name < b.name ? 1 : -1));
  }
  return rootState;
};
