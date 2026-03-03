import type { IUser } from '../../../entities/user/model/types';

export type IData = IUser;
export type DataKey = keyof IData;

export const DATA_FIELDS: DataKey[] = ['firstName', 'lastName', 'maidenName', 'age', 'gender', 'phone', 'email', 'country', 'city'];

export const PAGE_OPTIONS = [10, 25, 50, 100];
export const MIN_COLUMN_WIDTH = 40;
