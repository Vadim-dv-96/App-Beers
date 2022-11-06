import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getBeersTC, TabValueType } from '../state/beers-reducer';

type PaginPropsType = {
  numberPage: { [key in TabValueType]: number };
  tabValue: TabValueType;
};

export function Pagination(props: PaginPropsType) {
  const beers = useAppSelector((state) => state.beer.beers);
  const dispatch = useAppDispatch();

  const setPageinc = (numberPageInc: number) => {
    if (props.tabValue === 'with steak') {
      dispatch(getBeersTC(++numberPageInc, 'with steak', 'steak'));
    }
    if (props.tabValue === 'All beers') {
      dispatch(getBeersTC(++numberPageInc, 'All beers', null));
    }
  };

  const setPagedec = (numberPageDec: number) => {
    if (props.tabValue === 'with steak') {
      dispatch(getBeersTC(--numberPageDec, 'with steak', 'steak'));
    }
    if (props.tabValue === 'All beers') {
      dispatch(getBeersTC(--numberPageDec, 'All beers', null));
    }
  };

  return (
    <div className="pagination">
      <Button
        size="small"
        variant="outlined"
        style={{ marginRight: '6px' }}
        disabled={props.numberPage[props.tabValue] === 1}
        onClick={() => setPagedec(props.numberPage[props.tabValue])}
      >
        back
      </Button>
      <div> {props.numberPage[props.tabValue]} </div>
      <Button
        disabled={beers.length < 15}
        size="small"
        variant="outlined"
        style={{ marginLeft: '6px' }}
        onClick={() => {
          return setPageinc(props.numberPage[props.tabValue]);
        }}
      >
        next
      </Button>
    </div>
  );
}
