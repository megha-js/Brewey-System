import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  HANDLE_CHANGE,
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
import { initialState } from "./appContext";
const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === GET_BREWERIES_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_BREWERIES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      breweries: action.payload.breweries,
    };
  }
  if (action.type === GET_BREWERIES_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === GET_BREWERIESINFOBYID_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_BREWERIESINFOBYID_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      breweriesInfo: action.payload.breweriesInfo,
    };
  }
  if (action.type === GET_BREWERIESINFOBYID_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === GET_BREWERIESREVIEWS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_BREWERIESREVIEWS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      breweriesReviews: action.payload.breweriesReviews,
    };
  }
  if (action.type === GET_BREWERIESREVIEWS_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === CREATE_BREWERIESREVIEWS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_BREWERIESREVIEWS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      breweriesReviews: action.payload.breweriesReviews,
    };
  }
  if (action.type === CREATE_BREWERIESREVIEWS_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    // set back to first page
    return { ...state, page: 1, [action.payload.name]: action.payload.value };
  }

  throw new Error(`no such action :${action.type}`);
};

export default reducer;
