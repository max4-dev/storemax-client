import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { LoginParams } from "./types";

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params: LoginParams) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: LoginParams) => {
  const { data } = await axios.post('/auth/register', params);
  return data;
});