import { UrlRange } from "../typings";

export default class AbstractPaginator<T> {

  items: T[]
  
  onEachSideValue: number = 3;

  currentPage: number;
  lastPage: number;

  url_path: string;
  url_params: URLSearchParams;

  perPage: number;

  [Symbol.iterator](){
    return this.items[Symbol.iterator]();
  };

  forEach(callback: (item: T, index: number) => void): void {
    return this.items.forEach(callback);
  }

  map(callback: (item: T, index: number, array: T[]) => T, thisArg?: any): this {
    return Object.assign(this, {items: this.items.map(callback, thisArg)});
  }

  onEachSide(value: number): this {
    this.onEachSideValue = value;
    return this;
  }

  /**
   * Create a range of pagination URLs.
   */
  getUrlRange(start: number, end: number): UrlRange{
    const out: UrlRange = {};
    for(let i = start; i <= end; i++){
      out[i] = this.url_path ? this.url(i) : i.toString();
    }
    return out;
  }

  /**
   * Get the URL for a given page number.
   */
  url(page: number): string {

    if(page <= 0) {
      page = 1;
    }

    this.url_params.set('page', page.toString());
    const url = this.url_path + '?' + this.url_params.toString();
    this.url_params.delete('page');

    return url;
  }

  /**
   * Determine if the given value is a valid page number.
   */
  protected isValidPageNumber(page: number): boolean {
    return page >= 1 && !isNaN(page);
  }

}