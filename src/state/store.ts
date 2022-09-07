import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { BeersActionsType, beersReducer } from './beers-reducer';

export const rootReducer = combineReducers({
  beers: beersReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AllActionsType = BeersActionsType;

// типизация хука dispatch в папке hooks
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllActionsType>;

// типизация санок
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllActionsType>;
