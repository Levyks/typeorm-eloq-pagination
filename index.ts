import { SelectQueryBuilder, Repository, getRepository } from 'typeorm';

import LengthAwarePaginator from './src/classes/LengthAwarePaginator';

export async function paginate<T>(
  target:  Repository<T> | SelectQueryBuilder<T>, 
  page: number = 1, perPage: number = 10, path?: string
): Promise<LengthAwarePaginator<T>> {
  let sqb: SelectQueryBuilder<T>;
  
  if(target instanceof Repository) {
    sqb = target.createQueryBuilder(); 
  } else if(target instanceof SelectQueryBuilder) {
    sqb = target;
  } else {
    throw new Error('Invalid target for pagination');
  }

  sqb.offset((page - 1) * perPage);
  sqb.limit(perPage);

  const total = await sqb.getCount();
  const elements = await sqb.getMany();

  return new LengthAwarePaginator(elements, total, page, perPage, path);
}