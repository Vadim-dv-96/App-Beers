import { beersApi } from '../api/beers-api';
import { BeersType } from '../components/BeerItem';
import { setAppStatusAC } from './app-reducer';
import { AppThunk } from './store';

export type FoodValue = 'pizza' | 'steak' | null;
export type TabValueType = 'All beers' | 'with pizza' | 'with steak';
export type SortValuesType = 'Without a filter' | 'ABV ascending' | 'ABV descending' | 'A-Z' | 'Z-A';

type InitialStateType = typeof initialState;
const initialState = {
  beers: [] as Array<BeersType>,
  sort: 'Without a filter' as SortValuesType,
  numberPage: {
    'All beers': 1,
    'with pizza': 1,
    'with steak': 1,
  },
  food: null as FoodValue,
  tabValue: 'All beers' as TabValueType,
};

export const beersReducer = (state: InitialStateType = initialState, action: BeersActionsType): InitialStateType => {
  switch (action.type) {
    case 'GET-BEERS':
      return {
        ...state,
        beers: action.beers,
        tabValue: action.tabValue,
        food: action.food,
        // numberPage: action.numbPage,
        numberPage: { ...state.numberPage, [action.tabValue]: action.numbPage },
      };
    case 'SORT-BEERS': {
      return { ...state, sort: action.sortValue };
    }
    case 'GET-CURRENT-BEER':
      return { ...state, beers: action.beer };
    default:
      return state;
  }
};

//AC
export const getBeersAC = (beers: Array<BeersType>, tabValue: TabValueType, food: FoodValue, numbPage: number) => {
  return { type: 'GET-BEERS', beers, tabValue, food, numbPage } as const;
};
export const sortBeersAC = (sortValue: SortValuesType) => {
  return { type: 'SORT-BEERS', sortValue } as const;
};
export const getCurrentBeerAC = (beer: Array<BeersType>) => {
  return { type: 'GET-CURRENT-BEER', beer } as const;
};
// export const setIncNumbAC = (numberPage: number) => {
//   return { type: 'SET-INC-NUMB', numberPage } as const;
// };

//TC
export const getBeersTC =
  (numbPage: number, tabValue: TabValueType, food: FoodValue): AppThunk =>
  (dispatch) => {
    debugger;
    dispatch(setAppStatusAC('loading'));
    beersApi.getBeers(numbPage, food).then((res) => {
      dispatch(getBeersAC(res.data, tabValue, food, numbPage));
      console.log(numbPage);
      dispatch(setAppStatusAC('succeeded'));
    });
  };

export const getCurrentTC =
  (beerId: number): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    beersApi.getCurrentBeer(beerId).then((res) => {
      dispatch(getCurrentBeerAC(res.data));
      dispatch(setAppStatusAC('succeeded'));
    });
  };

//types
export type GetBeersActionType = ReturnType<typeof getBeersAC>;
export type SortBeersActionType = ReturnType<typeof sortBeersAC>;
export type GetCurrentBeerActionType = ReturnType<typeof getCurrentBeerAC>;
// export type SetIncNumbActionType = ReturnType<typeof setIncNumbAC>;

export type BeersActionsType = GetBeersActionType | SortBeersActionType | GetCurrentBeerActionType;
// | SetIncNumbActionType;
