import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemonList = createAsyncThunk(
  "pokemon/updateList",
  async () => {
    const response = await axios.get(API_URL);
    return response.data.results;
  },
);

export const fetchPokemonDetail = createAsyncThunk(
  "pokemon/updateDetail",
  async (val) => {
    const response = await axios.get(`${API_URL}/${val}`);
    return response.data;
  },
);

const initialState = {
  list: [],
  detail: {},
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonList.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(fetchPokemonDetail.fulfilled, (state, action) => {
      state.detail = action.payload;
    });
  },
});

export const { updateDetail, updateList } = pokemonSlice.actions;

export default pokemonSlice.reducer;
