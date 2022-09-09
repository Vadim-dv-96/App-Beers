import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { appReducer, AppReducerActionType } from './app-reducer';
import { BeersActionsType, beersReducer } from './beers-reducer';

export const rootReducer = combineReducers({
  beers: beersReducer,
  api: appReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AllActionsType = BeersActionsType | AppReducerActionType;

// типизация хука dispatch в папке hooks
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllActionsType>;

// типизация санок
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllActionsType>;
