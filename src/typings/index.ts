export type UrlRange = {
  [page: number]: string;
}

export type Slider = {
  first: UrlRange,
  slider: UrlRange,
  last: UrlRange,
}

export type Elements = (UrlRange | '...')[];