import { PaginationOutput } from 'src/@types/pagination/pagination.output';

export class Paginator {
  private pageSize: number;
  private pageSizeLimit: number;
  private currentPage: number;
  private totalItems: number;

  constructor(data: {
    totalItems?: number;
    pageSize: number;
    pageSizeLimit?: number;
  }) {
    this.pageSize = data.pageSize;
    this.currentPage = 1;
    this.totalItems = data.totalItems ?? 0;
    this.pageSizeLimit = data.pageSizeLimit ?? 10;
  }

  getPagination(): PaginationOutput {
    return {
      page: Number(this.currentPage),
      perPage: Number(this.pageSize),
      totalPages: this.getTotalPages(),
      nextPage: this.getNextPageNumber(),
      previousPage: this.getPreviousPageNumber(),
      totalItems: this.getTotalItems(),
    };
  }

  getPaginationForFilter(): { offset: number; limit: number } {
    const currentPage = this.getCurrentPage();
    const pageSize = this.getPageSize();
    const offset = (currentPage - 1) * pageSize;

    return { offset, limit: pageSize };
  }

  goToPage(page: number): void {
    if (page >= 1 && (this.totalItems === 0 || page <= this.getTotalPages())) {
      this.currentPage = page;
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getNextPageNumber(): number | null {
    if (this.currentPage < this.getTotalPages()) {
      return Number(this.currentPage) + 1;
    }

    return null;
  }

  getPreviousPageNumber(): number | null {
    if (this.currentPage > 1) {
      return this.currentPage - 1;
    }

    return null;
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  getCurrentPage(): number {
    return Number(this.currentPage);
  }

  getTotalItems(): number {
    return this.totalItems;
  }

  getPageSize(): number {
    if (this.pageSize && this.pageSize > this.pageSizeLimit) {
      this.setPageSize(this.pageSizeLimit);
    }

    return this.pageSize;
  }

  setPageSize(pageSize: number): void {
    this.pageSize = pageSize;
  }

  setTotalItems(totalItems: number): void {
    this.totalItems = totalItems;
  }
}
