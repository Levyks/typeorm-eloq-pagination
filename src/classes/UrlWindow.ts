import LengthAwarePaginator from "./LengthAwarePaginator";

import type { Slider, UrlRange } from '../typings';

export default class UrlWindow<T> {
  
  /**
   * Create a new URL window instance.
   */
  constructor(
    public paginator: LengthAwarePaginator<T>
  ) {}

  /**
   * Create a new URL window instance.
   */
  static make<T>(paginator: LengthAwarePaginator<T>): Slider {
    return new this(paginator).get();
  }

  /**
   * Get the window of URLs to be shown.
   */
  get(): Slider {
    const onEachSide = this.paginator.onEachSideValue;

    if (this.paginator.lastPage < (onEachSide * 2) + 8) {
        return this.getSmallSlider();
    }

    return this.getUrlSlider(onEachSide);
  }

  /**
   * Get the slider of URLs there are not enough pages to slide.
   */
  protected getSmallSlider(): Slider {
    return {
      first: this.paginator.getUrlRange(1, this.paginator.lastPage),
      slider: null,
      last: null,
    }
  }

  /**
   * Create a URL slider links.
   */
  protected getUrlSlider(onEachSide: number): Slider {
    const window = onEachSide + 4;
    
    if (!this.paginator.hasPages) {
      return {first: null, slider: null, last: null};
    }

    // If the current page is very close to the beginning of the page range, we will
    // just render the beginning of the page range, followed by the last 2 of the
    // links in this list, since we will not have room to create a full slider.
    if (this.paginator.currentPage <= window) {
        return this.getSliderTooCloseToBeginning(window, onEachSide);
    }

    // If the current page is close to the ending of the page range we will just get
    // this first couple pages, followed by a larger window of these ending pages
    // since we're too close to the end of the list to create a full on slider.
    else if (this.paginator.currentPage > (this.paginator.lastPage - window)) {
        return this.getSliderTooCloseToEnding(window, onEachSide);
    }

    // If we have enough room on both sides of the current page to build a slider we
    // will surround it with both the beginning and ending caps, with this window
    // of pages in the middle providing a Google style sliding paginator setup.
    return this.getFullSlider(onEachSide);
  }

  /**
   * Get the slider of URLs when too close to beginning of window.
   */
  protected getSliderTooCloseToBeginning(window: number, onEachSide: number): Slider {
    return {
      first: this.paginator.getUrlRange(1, window + onEachSide),
      slider: null,
      last: this.getFinish(),
    }
  }

  /**
  * Get the slider of URLs when too close to ending of window.
  */
  protected getSliderTooCloseToEnding(window: number, onEachSide: number): Slider {
    const last = this.paginator.getUrlRange(
      this.paginator.lastPage - (window + (onEachSide - 1)),
      this.paginator.lastPage
    );

    return {
      first: this.getStart(),
      slider: null,
      last 
    };
  }

  /**
  * Get the slider of URLs when a full slider can be made.
  */
  protected getFullSlider(onEachSide: number): Slider {
    return {
      first: this.getStart(),
      slider: this.getAdjacentUrlRange(onEachSide),
      last: this.getFinish(),
    };
  }

  /**
   * Get the page range for the current page window.
   */
  getAdjacentUrlRange(onEachSide: number): UrlRange {
    return this.paginator.getUrlRange(
      this.paginator.currentPage - onEachSide,
      this.paginator.currentPage + onEachSide
    );
  }  

  /**
   * Get the starting URLs of a pagination slider.
   */
  getStart(): UrlRange{
    return this.paginator.getUrlRange(1, 2);
  }

  /**
   * Get the ending URLs of a pagination slider.
   */
  getFinish(): UrlRange {
    return this.paginator.getUrlRange(
      this.paginator.lastPage - 1,
      this.paginator.lastPage
    );
  }

}