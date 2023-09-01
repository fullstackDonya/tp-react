// weather.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cities: [], // Tableau pour stocker les villes choisies pour la météo
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addWeatherCity: (state, action) => {
      const { name, id, minTemp, maxTemp } = action.payload; 
      state.cities.push({ name, id, minTemp, maxTemp });
    },
    removeWeatherCity: (state, action) => {
      state.cities = state.cities.filter(city => city.name !== action.payload);
    },
  },
});

export const { addWeatherCity, removeWeatherCity } = weatherSlice.actions;

export default weatherSlice.reducer;
