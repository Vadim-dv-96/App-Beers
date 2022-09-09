import { beersApi } from '../api/beers-api';
import { BeersType } from '../components/BeerItem';
import { setAppStatusAC } from './app-reducer';
import { AppThunk } from './store';

const initialState: Array<BeersType> = [];
export const beersReducer = (state: Array<BeersType> = initialState, action: BeersActionsType): Array<BeersType> => {
  switch (action.type) {
    case 'GET-BEERS':
      return action.beers.map((beers) => ({ ...beers }));
    case 'GET-BEERS-WITH-PIZZA':
      return action.beersWithPizza.map((b) => ({ ...b }));
    case 'GET-BEERS-WITH-STEAK':
      return action.beersWithSteak.map((b) => ({ ...b }));
    case 'GET-NEXT-BEERS':
      return action.beers.map((b) => ({ ...b }));
    case 'GET-NEXT-BEERS-FOR-STEAK':
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
export const getNextBeersAC = (beers: Array<BeersType>, numbPage: number) => {
  return { type: 'GET-NEXT-BEERS', beers, numbPage } as const;
};
export const getNextBeersForSteakAC = (beersWithSteak: Array<BeersType>, numbPage: number) => {
  return { type: 'GET-NEXT-BEERS-FOR-STEAK', beersWithSteak, numbPage } as const;
};

//TC
export const getBeersTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC('loading'));
  beersApi.getBeers().then((res) => {
    dispatch(getBeersAC(res.data));
    dispatch(setAppStatusAC('succeeded'));
  });
};
export const getBeersWithPizzaTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC('loading'));
  beersApi.getBeersWithPizza().then((res) => {
    dispatch(getBeersWithPizzaAC(res.data));
    dispatch(setAppStatusAC('succeeded'));
  });
};
export const getBeersWithSteakTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC('loading'));
  beersApi.getBeersWithSteak().then((res) => {
    dispatch(getBeersWithSteakAC(res.data));
    dispatch(setAppStatusAC('succeeded'));
  });
};
export const getNextBeersTC =
  (numbPage: number): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    beersApi.getNextBeers(numbPage).then((res) => {
      dispatch(getNextBeersAC(res.data, numbPage));
      dispatch(setAppStatusAC('succeeded'));
    });
  };
export const getNextBeersForSteakTC =
  (numbPage: number): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    beersApi.getNextBeersForSteak(numbPage).then((res) => {
      dispatch(getNextBeersForSteakAC(res.data, numbPage));
      dispatch(setAppStatusAC('succeeded'));
    });
  };

//types
export type GetBeersActionType = ReturnType<typeof getBeersAC>;
export type GetBeersWithPizzaActionType = ReturnType<typeof getBeersWithPizzaAC>;
export type GetBeersWithSteakActionType = ReturnType<typeof getBeersWithSteakAC>;
export type GetNextBeersActionType = ReturnType<typeof getNextBeersAC>;
export type GetNextBeersForSteakActionType = ReturnType<typeof getNextBeersForSteakAC>;

export type BeersActionsType =
  | GetBeersActionType
  | GetBeersWithPizzaActionType
  | GetBeersWithSteakActionType
  | GetNextBeersActionType
  | GetNextBeersForSteakActionType;
