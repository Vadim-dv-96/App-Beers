const initialState = {
  status: 'idle' as RequestStatusType,
};

type InitialStateType = typeof initialState;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status };
    default:
      return state;
  }
};

//AC
export const setAppStatusAC = (status: RequestStatusType) => {
  return { type: 'APP/SET-STATUS', status } as const;
};

//types
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;

export type AppReducerActionType = SetAppStatusActionType;
