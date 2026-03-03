import { fetchJson } from '../../../shared/api/http/fetchClient';
import type { UserDto, UsersResponseDto } from './dto';
import type { IUser, UserQueryParams } from '../model/types';

const USERS_URL = 'https://dummyjson.com/users';
const FILTER_USERS_URL = 'https://dummyjson.com/users/filter';

interface UsersResult {
  users: IUser[];
  total: number;
}

function toUserModel(dto: UserDto): IUser {
  console.log(dto);
  return {
    firstName: dto.firstName,
    lastName: dto.lastName,
    maidenName: dto.maidenName,
    phone: dto.phone,
    age: dto.age,
    gender: dto.gender,
    email: dto.email,
    city: dto.address.city,
    country: dto.address.country,
  };
}

export async function getUsers(params: UserQueryParams): Promise<UsersResult> {
  const searchParams = new URLSearchParams();
  searchParams.set('limit', String(params.limit));
  searchParams.set('skip', String(params.skip));

  if (params.sortField && params.sortOrder !== 'No Sort') {
    searchParams.set('sortBy', params.sortField);
    searchParams.set('order', params.sortOrder === 'Ascend' ? 'asc' : 'desc');
  }

  if (params.filterField && params.filterValue.trim()) {
    searchParams.set('key', params.filterField);
    searchParams.set('value', params.filterValue.trim());

    const response = await fetchJson<UsersResponseDto>(`${FILTER_USERS_URL}?${searchParams.toString()}&select=firstName,lastName,maidenName,age,gender,phone,email,address`, {
      signal: params.signal,
    });

    return {
      users: response.users.map(toUserModel),
      total: response.total,
    };
  }

  const response = await fetchJson<UsersResponseDto>(`${USERS_URL}?${searchParams.toString()}&select=firstName,lastName,maidenName,age,gender,phone,email,address`, {
    signal: params.signal,
  });

  return {
    users: response.users.map(toUserModel),
    total: response.total,
  };
}
