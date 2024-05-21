import Pagination from '@mui/material/Pagination';
import React from "react";
import {PaginationData} from "../../interfaces/PaginationData";

interface Props  {
    pagination: PaginationData,
    onPaginationClick: (page: number) => void
}
export default function ListPagination({pagination, onPaginationClick}: Props) {
    const pagesCount: number = Math.ceil((pagination.totalItems || 1) / pagination.perPage);

   return <Pagination
       count={pagesCount}
       variant={'outlined'}
       onChange={(e, page) => onPaginationClick(page)}
       sx={{margin: 1}}
   />
}