import React, { useReducer, useContext } from "react";
import axios from "axios";
import reducer from "./reducer";
import { toast } from "react-toastify";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  GET_BREWERIES_BEGIN,
  GET_BREWERIES_SUCCESS,
  GET_BREWERIES_ERROR,
  GET_BREWERIESINFOBYID_BEGIN,
  GET_BREWERIESINFOBYID_SUCCESS,
  GET_BREWERIESINFOBYID_ERROR,
  GET_BREWERIESREVIEWS_BEGIN,
  GET_BREWERIESREVIEWS_SUCCESS,
  GET_BREWERIESREVIEWS_ERROR,
  CREATE_BREWERIESREVIEWS_BEGIN,
  CREATE_BREWERIESREVIEWS_SUCCESS,
  CREATE_BREWERIESREVIEWS_ERROR,
} from "./actions";
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  breweries: [],
  breweriesInfo: {},
  breweriesReviews: []
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  // response interceptor
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  const getBreweries = async (breweryParameter) => {
    dispatch({ type: GET_BREWERIES_BEGIN });
    try {
      const { category, value } = breweryParameter;
      const { data } = await axios.get(`/api/v1/breweries?category=${category}&value=${value}`);
      const breweries = data.data;
      dispatch({
        type: GET_BREWERIES_SUCCESS,
        payload: { breweries },
      });
    } catch (error) {
      dispatch({
        type: GET_BREWERIES_ERROR,
      });
      toast.error(error.response.data.msg);
    }
  }
  const getBreweriesInfo = async (breweryId) => {
    dispatch({ type: GET_BREWERIESINFOBYID_BEGIN });
    try {
      const { data } = await axios.get(`/api/v1/breweries/${breweryId}`);
      const breweriesInfo = data.data;
      dispatch({
        type: GET_BREWERIESINFOBYID_SUCCESS,
        payload: { breweriesInfo },
      });
    } catch (error) {
      dispatch({
        type: GET_BREWERIESINFOBYID_ERROR,
      });
      toast.error(error.response.data.msg);
    }
  }
  const getBreweriesReviews = async (breweryId) => {
    dispatch({ type: GET_BREWERIESREVIEWS_BEGIN });
    try {
      const { data } = await axios.get(`/api/v1/breweries/${breweryId}/reviews`);
      const breweriesReviews = data?.brewery?.reviews;
      dispatch({
        type: GET_BREWERIESREVIEWS_SUCCESS,
        payload: { breweriesReviews },
      });
    } catch (error) {
      dispatch({
        type: GET_BREWERIESREVIEWS_ERROR,
      });
      toast.error(error.response.data.msg);
    }
  }

  const setupUser = async (currentUser, endPoint, alertText) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token } = data;
      addUserToLocalStorage({ user, token });

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token },
      });
      toast.success(alertText);
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
      });
      toast.error(error.response.data.msg);
    }
  };
  const createReviewPost = async (reviewData) => {
    dispatch({ type: CREATE_BREWERIESREVIEWS_BEGIN });
    try {

      const { rating, description, breweryId } = reviewData;
      const { data } = await axios.post(
        `/api/v1/breweries/${breweryId?.breweryId}/reviews`,
        { rating, description }
      );
      const breweriesReviews = data.brewery.reviews;
      dispatch({
        type: CREATE_BREWERIESREVIEWS_SUCCESS,
        payload: { breweriesReviews },
      });
      addUserToLocalStorage({ user, token });
      toast.success("Your Review Added Successfully.");
    } catch (error) {
      dispatch({
        type: CREATE_BREWERIESREVIEWS_ERROR,
      });
      toast.error(error.response.data.msg);
    }
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        setupUser,
        getBreweries,
        getBreweriesInfo,
        getBreweriesReviews,
        createReviewPost,
        logoutUser,
        handleChange,
        clearValues,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
