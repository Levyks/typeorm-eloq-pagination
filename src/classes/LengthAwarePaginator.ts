import { Slider, Elements } from "../typings";
import AbstractPaginator from "./AbstractPaginator";
import UrlWindow from "./UrlWindow";

export default class LengthAwarePaginator<T> extends AbstractPaginator<T> {
  
  hasPages: boolean;
  hasMorePages: boolean;
  nextPageUrl: string;

  constructor(
    public items: T[],
    public total: number,
    currentPage: number,
    public perPage: number,
    path: string
  ) { 
    super();
    this.lastPage = Math.max(Math.ceil(total / perPage), 1);
    this.currentPage = this.setCurrentPage(currentPage);

    this.hasPages = this.lastPage > 1;
    this.hasMorePages = this.currentPage < this.lastPage;

    if(path) {
      const url_splitted = path.split('?');
      this.url_path = url_splitted[0];
      this.url_params = new URLSearchParams(url_splitted[1]);

      this.nextPageUrl = this.hasMorePages ? this.url(this.currentPage + 1) : null;
    }
  }

  /**
   * Get the current page for the request.
   * (???)
   */
  protected setCurrentPage(page: number) {
    return this.isValidPageNumber(page) ? page : 1;
  }
  
  /**
   * Returns the object with the pagination links data.
   */
  links(): Elements {
    return this.elements();
  }

  /**
   * Get the array of elements to pass to the view.
   *
   * @return array
   */
  protected elements(): Elements {
    const window: Slider = UrlWindow.make(this);

    return [
      window.first,
      window.slider ? '...' : null,
      window.slider,
      window.last ? '...' : null,
      window.last,
    ].filter((e) => e);
  }
}