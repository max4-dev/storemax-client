import { Status } from '../goods/types';

export interface User {
  _id: string,
  fullName: string,
  email: string,
  admin: boolean,
  createdAt: string,
  updatedAt: string,
}

export interface AuthSliceState {
  data: User | null,
  status: Status,
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  fullName: string;
  password: string;
}

export {Status}