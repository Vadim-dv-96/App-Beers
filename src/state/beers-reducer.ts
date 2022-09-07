import { beersApi } from '../api/beers-api';
import { BeersType } from '../components/BeerItem';
import { AppThunk } from './store';

const initialState: Array<BeersType> = [];
export const beersReducer = (state: Array<BeersType> = initialState, action: BeersActionsType) => {
  switch (action.type) {
    case 'GET-BEERS':
      return action.beers.map((beers) => ({ ...beers }));
    case 'GET-BEERS-WITH-PIZZA':
      return action.beersWithPizza.map((b) => ({ ...b }));
    case 'GET-BEERS-WITH-STEAK':
      return action.beersWithSteak.map((b) => ({ ...b }));
    default:
      return state;
  }
};

//AC
export const getBeersAC = (beers: Array<BeersType>) => {
  return { type: 'GET-BEERS', beers } as const;
};
export const getBeersWithPizzaAC = (beersWithPizza: Array<BeersType>) => {
  return { type: 'GET-BEERS-WITH-PIZZA', beersWithPizza } as const;
};
export const getBeersWithSteakAC = (beersWithSteak: Array<BeersType>) => {
  return { type: 'GET-BEERS-WITH-STEAK', beersWithSteak } as const;
};

//TC
export const getBeersTC = (): AppThunk => (dispatch) => {
  beersApi.getBeers().then((res) => {
    dispatch(getBeersAC(res.data));
  });
};
export const getBeersWithPizzaTC = (): AppThunk => (dispatch) => {
  beersApi.getBeersWithPizza().then((res) => {
    dispatch(getBeersWithPizzaAC(res.data));
  });
};
export const getBeersWithSteakTC = (): AppThunk => (dispatch) => {
  beersApi.getBeersWithSteak().then((res) => {
    dispatch(getBeersWithSteakAC(res.data));
  });
};

//types
export type GetBeersActionType = ReturnType<typeof getBeersAC>;
export type GetBeersWithPizzaActionType = ReturnType<typeof getBeersWithPizzaAC>;
export type GetBeersWithSteakActionType = ReturnType<typeof getBeersWithSteakAC>;

export type BeersActionsType = GetBeersActionType | GetBeersWithPizzaActionType | GetBeersWithSteakActionType;
