import {PaginationData} from "./PaginationData";

export interface PaginatedListResponse<T> {
    list: T[],
    pagination: PaginationData
}