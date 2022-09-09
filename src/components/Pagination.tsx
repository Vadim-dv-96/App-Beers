import Button from '@mui/material/Button';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getNextBeersForSteakTC, getNextBeersTC } from '../state/beers-reducer';

// export type ValueTabType = 'All beers' | 'with pizza' | 'with steak';

type PaginPropsType = {
  // nextPageHandler: (pageNumb: number) => void;
  valueTab: string;
};

export function Pagination(props: PaginPropsType) {
  const beers = useAppSelector((state) => state.beers);
  console.log(beers);
  const dispatch = useAppDispatch();

  let [page, setPage] = useState<number>(1);

  const nextPage = (pageNumb: number) => {
    if (props.valueTab === 'with steak') {
      dispatch(getNextBeersForSteakTC(pageNumb));
    }
    if (props.valueTab === 'All beers') {
      dispatch(getNextBeersTC(pageNumb));
    }
  };
  // const nextPage = (page: number) => {
  //   props.nextPageHandler(page);
  // };
  const setPageinc = () => {
    setPage(++page);
    nextPage(page);
  };
  const setPagedec = () => {
    setPage(--page);
    nextPage(page);
  };

  return (
    <div className="pagination">
      <Button
        size="small"
        variant="outlined"
        style={{ marginRight: '6px' }}
        disabled={page === 1}
        onClick={() => setPagedec()}
      >
        back
      </Button>
      <div> {page} </div>
      <Button
        disabled={page === 13 || beers.length < 15}
        size="small"
        variant="outlined"
        style={{ marginLeft: '6px' }}
        onClick={() => setPageinc()}
      >
        next
      </Button>
    </div>
  );
}
