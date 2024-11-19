// /src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';  // Use configureStore from Redux Toolkit
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage by default
import axios from 'axios';

// Action Type
const SET_LISTINGS = 'SET_LISTINGS';

// Action Creator to set listings
const setListings = (listings) => ({
  type: SET_LISTINGS,
  payload: listings,
});

// Initial state for listings
const initialState = {
  listings: [],
};

// Reducer to handle the listings data
const listingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LISTINGS:
      return { ...state, listings: action.payload };
    default:
      return state;
  }
};

// Redux Persist configuration
const persistConfig = {
  key: 'root', // Key for the persisted state
  storage, // Storage method (localStorage in this case)
};

const persistedReducer = persistReducer(persistConfig, listingsReducer);

// Using Redux Toolkit's configureStore method
const store = configureStore({
  reducer: persistedReducer,
  // Optional: You can add more middlewares here if needed
});

const persistor = persistStore(store);

// Function to fetch listings data from backend and dispatch to Redux
const fetchListings = async (dispatch) => {
  try {
    const response = await axios.get(
      'https://trustnride-backend-production.up.railway.app/api/listings/Carlisting'
    );
    const listingsData = response.data.slice(0, 15); // Limit to first 15 listings
    dispatch(setListings(listingsData)); // Dispatch to store
  } catch (error) {
    console.error('Error fetching listings:', error);
  }
};

export { store, persistor, fetchListings, setListings };
