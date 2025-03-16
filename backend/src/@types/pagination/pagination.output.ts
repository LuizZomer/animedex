export type PaginationOutput = {
  page: number;
  perPage: number;
  totalPages: number;
  nextPage: number | null;
  previousPage: number | null;
  totalItems: number;
};
