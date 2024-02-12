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
  async (url) => {
    const response = await axios.get(url);
    return {
      name: response.data.name,
      imageUrl: response.data.sprites.other["official-artwork"].front_default,
    };
  },
);

const initialState = {
  list: [],
  detail: {},
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    resetDetail: (state) => {
      state.detail = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonList.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    builder.addCase(fetchPokemonDetail.fulfilled, (state, action) => {
      state.detail = action.payload;
    });
  },
});

export const { resetDetail } = pokemonSlice.actions;

export default pokemonSlice.reducer;
