import { combineReducers } from "redux";

const InitialState = {
  search: "",
};
const landlordDashboard = {
  search: "",
  currentListings: [],
};

const adminDashboard = {};

const API_RESPONE = {
  initalAPI: {},
};

const dashboardState = (state = InitialState, action) => {
  if (action.type && action.origin === "buyerDashboard")
    return { ...state, ...{ [`${action.type}`]: action.payload } };
  else if (action.type && action.origin === 'buyerLogout') {
    return InitialState;
  }
  else return state;
};

const APIState = (state = API_RESPONE, action) => {
  if ([].includes(action.type))
    return {
      ...state,
      metadata: {
        ...state.metadata,
        ...{ [`${action.type}`]: action.payload },
      },
    };
  return state;
};

const landlordDashboardState = (state = landlordDashboard, action) => {
  if (action.type && "landlordDashboard" === action.origin)
    return { ...state, ...{ [`${action.type}`]: action.payload } };
    else if (action.type && action.origin === 'sellerLogout') {
      return landlordDashboard;
    }
  else return state;
};

const adminDashboardState = (state = adminDashboard, action) => {
  if (action.type && action.origin === "adminDashboard")
    return { ...state, ...{ [`${action.type}`]: action.payload } };
  else if(action.type && action.origin === 'adminLogout') {
    return adminDashboard;
  }
  else return state;
};

export default combineReducers({
  dashboard: dashboardState,
  metadata: APIState,
  landlordDashboard: landlordDashboardState,
  adminDashboard: adminDashboardState,
});
