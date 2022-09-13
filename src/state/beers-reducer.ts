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
};
type InitialStateType = typeof initialState;
export const beersReducer = (state: InitialStateType = initialState, action: BeersActionsType): InitialStateType => {
  switch (action.type) {
    case 'GET-BEERS':
      return { ...state, beers: action.beers };

    // case 'GET-BEERS-WITH-PIZZA':
    //   return { ...state, beers: action.beersWithPizza };
    case 'GET-BEERS-WITH-FOOD':
      debugger;
      return { ...state, beers: action.beers, numberPage: action.numbPage, food: action.food };
    // case 'GET-BEERS-WITH-STEAK':
    //   return { ...state, beers: action.beersWithSteak };
    // case 'GET-NEXT-BEERS':
    //   return { ...state, beers: action.beers };
    // case 'GET-NEXT-BEERS-FOR-STEAK':
    //   return { ...state, beers: action.beersWithSteak };
    case 'SORT-BEERS': {
      return { ...state, sort: action.sortValue };
    }
    default:
      return state;
  }
};

//AC
export const getBeersAC = (beers: Array<BeersType>) => {
  return { type: 'GET-BEERS', beers } as const;
};
// export const getNextBeersAC = (beers: Array<BeersType>, numbPage: number) => {
//   return { type: 'GET-NEXT-BEERS', beers, numbPage } as const;
// };
// export const getBeersWithPizzaAC = (beersWithPizza: Array<BeersType>) => {
//   return { type: 'GET-BEERS-WITH-PIZZA', beersWithPizza } as const;
// };
// export const getBeersWithSteakAC = (beersWithSteak: Array<BeersType>) => {
//   return { type: 'GET-BEERS-WITH-STEAK', beersWithSteak } as const;
// };
// export const getNextBeersForSteakAC = (beersWithSteak: Array<BeersType>, numbPage: number) => {
//   return { type: 'GET-NEXT-BEERS-FOR-STEAK', beersWithSteak, numbPage } as const;
// };
export const sortBeersAC = (sortValue: SortValuesType) => {
  return { type: 'SORT-BEERS', sortValue } as const;
};
export const getBeersWithFoodAC = (beers: Array<BeersType>, numbPage: number, food: FoodValue) => {
  return { type: 'GET-BEERS-WITH-FOOD', beers, numbPage, food } as const;
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
    debugger;
    dispatch(setAppStatusAC('loading'));
    beersApi.getBeersWithFood(food, numbPage).then((res) => {
      dispatch(getBeersWithFoodAC(res.data, numbPage, food));
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
// export type GetBeersWithPizzaActionType = ReturnType<typeof getBeersWithPizzaAC>;
// export type GetBeersWithSteakActionType = ReturnType<typeof getBeersWithSteakAC>;
// export type GetNextBeersActionType = ReturnType<typeof getNextBeersAC>;
// export type GetNextBeersForSteakActionType = ReturnType<typeof getNextBeersForSteakAC>;
export type SortBeersActionType = ReturnType<typeof sortBeersAC>;
export type GetBeersWithFoodACActionType = ReturnType<typeof getBeersWithFoodAC>;

export type BeersActionsType =
  | GetBeersActionType
  // | GetBeersWithPizzaActionType
  // | GetBeersWithSteakActionType
  // | GetNextBeersForSteakActionType
  | SortBeersActionType
  | GetBeersWithFoodACActionType;
