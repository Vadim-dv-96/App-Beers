import Button from '@mui/material/Button';
import { useState } from 'react';

export default function Pagination() {
  const [page, setPage] = useState<number>(1);

  return (
    <div className="pagination">
      <Button onClick={() => setPage(page - 1)}>back</Button>
      <div> {page} </div>
      <Button onClick={() => setPage(page + 1)}>next</Button>
    </div>
  );
}
