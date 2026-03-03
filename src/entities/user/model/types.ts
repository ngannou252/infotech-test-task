export interface IUser {
  firstName: string;
  lastName: string;
  maidenName: string;
  phone: string;
  age: number;
  gender: 'male' | 'female';
  email: string;
  country: string;
  city: string;
}

export type SortOrder = 'No Sort' | 'Ascend' | 'Descend';
export type UserSortableField = 'firstName' | 'lastName' | 'maidenName' | 'age' | 'gender' | 'phone';

export interface UserQueryParams {
  limit: number;
  skip: number;
  sortField: UserSortableField | null;
  sortOrder: SortOrder;
  filterField: UserSortableField | null;
  filterValue: string;
  signal?: AbortSignal;
}
