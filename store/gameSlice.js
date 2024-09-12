import { createSlice } from "@reduxjs/toolkit";
const FavoriteSlice = createSlice({
  name: "game",
  initialState: { favorites: [], scoreArray: [] },
  reducers: {
    setFavorites(state, action) {
      state.favorites.push(action.payload);
    },
    popFavorites(state, action) {
      state.favorites = state.favorites.filter((id) => {
        return id !== action.payload;
      });
    },
  },
});

export default FavoriteSlice;

export const favoriteAction = FavoriteSlice.actions;
