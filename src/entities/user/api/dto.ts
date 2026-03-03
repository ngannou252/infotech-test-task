export interface UserDto {
  firstName: string;
  lastName: string;
  maidenName: string;
  phone: string;
  age: number;
  gender: 'male' | 'female';
  email: string;
  address: {
    city: string;
    state: string;
    country: string;
  };
}

export interface UsersResponseDto {
  users: UserDto[];
  total: number;
  skip: number;
  limit: number;
}
