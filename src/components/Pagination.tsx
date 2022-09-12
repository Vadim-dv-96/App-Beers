import Button from '@mui/material/Button';
import { useAppSelector } from '../hooks/hooks';

type PaginPropsType = {
  valueTab: 'All beers' | 'with pizza' | 'with steak';
  changePage: (key: 'All beers' | 'with pizza' | 'with steak', page: number) => void;
  pages: { [key in 'All beers' | 'with pizza' | 'with steak']: number };
};

export function Pagination({ valueTab, changePage, pages }: PaginPropsType) {
  const beers = useAppSelector((state) => state.beer.beers);

  // let [page, setPage] = useState<number>(pages[valueTab]);

  // const nextPage = (pageNumb: number) => {
  //   // if (props.valueTab === 'with pizza') {
  //   // }
  //   // if (valueTab === 'with steak') {
  //   //   dispatch(getNextBeersForSteakTC(pageNumb));
  //   // }
  //   // if (valueTab === 'All beers') {
  //   //   dispatch(getNextBeersTC(pageNumb));
  //   // }
  // };
  // const nextPage = (page: number) => {
  //   props.nextPageHandler(page);
  // };
  const setPageinc = (pageNumb: number) => {
    // const pageNumb = ++page;
    // setPage(pageNumb);
    // nextPage(pageNumb);
    changePage(valueTab, pageNumb);
  };
  const setPagedec = (pageNumb: number) => {
    // const pageNumb = --page;
    // setPage(pageNumb);
    // nextPage(pageNumb);
    changePage(valueTab, pageNumb);
  };

  return (
    <div className="pagination">
      <Button
        size="small"
        variant="outlined"
        style={{ marginRight: '6px' }}
        disabled={pages[valueTab] === 1}
        onClick={() => setPagedec(--pages[valueTab])}
      >
        back
      </Button>
      <div> {pages[valueTab]} </div>
      <Button
        disabled={beers.length < 15}
        size="small"
        variant="outlined"
        style={{ marginLeft: '6px' }}
        onClick={() => setPageinc(++pages[valueTab])}
      >
        next
      </Button>
    </div>
  );
}
