import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { globalReducer } from "../reducers/globalReducer";
import {
  GET_TRENDING,
  GET_RANDOM,
  GET_SEARCH,
  LOADING,
  ADD_TO_FAVORITES,
  GET_FAVOURITES,
} from "../utils/globalActions";

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = "https://api.giphy.com/v1/gifs";

// console.log(apiKey);

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const initialState = {
    loading: false,
    searchResult: [],
    trending: [],
    favourites: [],
    random: {},
  };

  const [state, dispatch] = useReducer(globalReducer, initialState);
  // console.log(state);

  //
  //get trendings...
  const getTrending = async () => {
    dispatch({ type: LOADING });
    const res = await axios.get(
      `${baseUrl}/trending?api_key=${apiKey}&limit=35&rating=g`
    );
    // console.log(res.data.data);
    dispatch({ type: GET_TRENDING, payload: res.data.data });
  };

  //
  // get random....
  const getRandomGif = async () => {
    dispatch({ type: LOADING });
    const res = await axios.get(`${baseUrl}/random?api_key=${apiKey}`);
    dispatch({ type: GET_RANDOM, payload: res.data.data });
  };

  //
  // search results......
  const searchGifs = async (query) => {
    dispatch({ type: LOADING });
    const res = await axios.get(
      `${baseUrl}/search?api_key=${apiKey}&q=${query}&limit=25`
    );
    dispatch({ type: GET_SEARCH, payload: res.data.data });

    console.log(res.data.data);
  };

  //
  // save to favourites....
  const saveToFavourites = (gif) => {
    const storedItems =
      JSON.parse(window.localStorage.getItem("myfavourites")) || [];

    if (!storedItems.some((item) => item.id === gif.id)) {
      const items = [...storedItems, gif];

      window.localStorage.setItem("myfavourites", JSON.stringify(items));

      dispatch({ type: ADD_TO_FAVORITES, payload: gif });
      alert("Successfully added to your favourites....");
    } else {
      alert("It already exists in your favourites.... ");
    }
  };

  //
  // get from local storage..........
  const getFromLocalStorage = () => {
    const storedItems =
      JSON.parse(window.localStorage.getItem("myfavourites")) || [];
    dispatch({ type: GET_FAVOURITES, payload: storedItems });
  };
  //
  //
  const removeFromLocalStorage = (gif) => {
    const storedItems =
      JSON.parse(window.localStorage.getItem("myfavourites")) || [];
    const items = storedItems.filter((item) => item.id !== gif.id);
    window.localStorage.setItem("myfavourites", JSON.stringify(items));

    getFromLocalStorage(); //will get updated list
  };

  //

  useEffect(() => {
    getTrending();
    getRandomGif();
    searchGifs();
    getFromLocalStorage();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        getRandomGif,
        searchGifs,
        saveToFavourites,
        removeFromLocalStorage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
