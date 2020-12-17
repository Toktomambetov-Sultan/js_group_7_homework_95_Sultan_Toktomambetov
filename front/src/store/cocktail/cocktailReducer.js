import { FETCH_ERROR, FETCH_REQUEST, SET_COCKTAILS , FETCH_SUCCESS} from "../actionsTypes";

const initialState = {
  isLoading: false,
  error: null,
  cocktails: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_SUCCESS:
      return { ...state, isLoading: false };
    case FETCH_ERROR:
      return { ...state, isLoading: false, error: action.error };
    case SET_COCKTAILS:
      return { ...state, cocktails: action.data };
    default:
      return { ...state };
  }
};

export default reducer;
