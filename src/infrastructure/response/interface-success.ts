import { FindManyOptions } from 'typeorm';

export interface ISuccess {
  statusCode: number;
  message: string;
  data: object;
}

export interface IFindOptions<T> extends FindManyOptions<T> {}
