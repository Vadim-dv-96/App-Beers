import { beersApi } from '../api/beers-api';
import { BeersType, SortValuesType } from '../components/BeerItem';
import { setAppStatusAC } from './app-reducer';
import { AppThunk } from './store';

type FoodValue = 'pizza' | 'steak' | '';

const initialState = {
  beers: [] as Array<BeersType>,
  sort: 'Without a filter' as SortValuesType,
  numberPage: 1,
  food: '' as FoodValue,
  isCurrentBeer: false,
};
type InitialStateType = typeof initialState;
export const beersReducer = (state: InitialStateType = initialState, action: BeersActionsType): InitialStateType => {
  switch (action.type) {
    case 'GET-BEERS':
      return { ...state, beers: action.beers };
    case 'GET-BEERS-WITH-FOOD':
      debugger;
      return { ...state, beers: action.beers, numberPage: action.numbPage, food: action.food };
    case 'SORT-BEERS': {
      return { ...state, sort: action.sortValue };
    }
    case 'GET-CURRENT-BEER':
      debugger;
      return { ...state, beers: action.beer, isCurrentBeer: action.isCurrentBeer };
    case 'BACK-TO-VIEW-ALL-BEERS':
      return { ...state, beers: action.beers, isCurrentBeer: action.isCurrentBeer };
    default:
      return state;
  }
};

//AC
export const getBeersAC = (beers: Array<BeersType>) => {
  return { type: 'GET-BEERS', beers } as const;
};
export const sortBeersAC = (sortValue: SortValuesType) => {
  return { type: 'SORT-BEERS', sortValue } as const;
};
export const getBeersWithFoodAC = (beers: Array<BeersType>, numbPage: number, food: FoodValue) => {
  return { type: 'GET-BEERS-WITH-FOOD', beers, numbPage, food } as const;
};
export const getCurrentBeerAC = (beer: Array<BeersType>, isCurrentBeer: boolean) => {
  return { type: 'GET-CURRENT-BEER', beer, isCurrentBeer } as const;
};
export const backToViewAllBeersAC = (beers: Array<BeersType>, isCurrentBeer: boolean) => {
  return { type: 'BACK-TO-VIEW-ALL-BEERS', beers, isCurrentBeer } as const;
};

//TC
export const getBeersTC =
  (numbPage: number): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    beersApi.getBeers(numbPage).then((res) => {
      dispatch(getBeersAC(res.data));
      dispatch(setAppStatusAC('succeeded'));
    });
  };
export const getBeersWithFoodTC =
  (numbPage: number, food: FoodValue): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    beersApi.getBeersWithFood(food, numbPage).then((res) => {
      dispatch(getBeersWithFoodAC(res.data, numbPage, food));
      dispatch(setAppStatusAC('succeeded'));
    });
  };

export const getCurrentTC =
  (beerId: number): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    beersApi.getCurrentBeer(beerId).then((res) => {
      debugger;
      dispatch(getCurrentBeerAC(res.data, true));
      dispatch(setAppStatusAC('succeeded'));
    });
  };
export const backToViewAllBeersTC =
  (numbPage: number): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    beersApi.getBeers(numbPage).then((res) => {
      dispatch(backToViewAllBeersAC(res.data, false));
      dispatch(setAppStatusAC('succeeded'));
    });
  };

// export const getBeersWithPizzaTC = (): AppThunk => (dispatch) => {
//   dispatch(setAppStatusAC('loading'));
//   beersApi.getBeersWithPizza().then((res) => {
//     dispatch(getBeersWithPizzaAC(res.data));
//     dispatch(setAppStatusAC('succeeded'));
//   });
// };
// export const getBeersWithSteakTC = (): AppThunk => (dispatch) => {
//   dispatch(setAppStatusAC('loading'));
//   beersApi.getBeersWithSteak().then((res) => {
//     dispatch(getBeersWithSteakAC(res.data));
//     dispatch(setAppStatusAC('succeeded'));
//   });
// };
// export const getNextBeersTC =
//   (numbPage: number): AppThunk =>
//   (dispatch) => {
//     dispatch(setAppStatusAC('loading'));
//     beersApi.getNextBeers(numbPage).then((res) => {
//       dispatch(getNextBeersAC(res.data, numbPage));
//       dispatch(setAppStatusAC('succeeded'));
//     });
//   };
// export const getNextBeersForSteakTC =
//   (numbPage: number): AppThunk =>
//   (dispatch) => {
//     dispatch(setAppStatusAC('loading'));
//     beersApi.getNextBeersForSteak(numbPage).then((res) => {
//       dispatch(getNextBeersForSteakAC(res.data, numbPage));
//       dispatch(setAppStatusAC('succeeded'));
//     });
//   };

//types
export type GetBeersActionType = ReturnType<typeof getBeersAC>;
export type SortBeersActionType = ReturnType<typeof sortBeersAC>;
export type GetBeersWithFoodActionType = ReturnType<typeof getBeersWithFoodAC>;
export type GetCurrentBeerActionType = ReturnType<typeof getCurrentBeerAC>;
export type BackToViewAllBeersActionType = ReturnType<typeof backToViewAllBeersAC>;

export type BeersActionsType =
  | GetBeersActionType
  | SortBeersActionType
  | GetBeersWithFoodActionType
  | GetCurrentBeerActionType
  | BackToViewAllBeersActionType;
