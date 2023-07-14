import React, { useState, useEffect, useReducer, useContext } from "react";
import reducer from "./reducers";
import axios from "axios";
import {
  DISPLAY_ALERT,
  DISPLAY_ALERT_TEXT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOBR_BEGIN,
  CREATE_JOBR_SUCCESS,
  CREATE_JOBR_ERROR,
  GET_JOBSR_BEGIN,
  GET_JOBSR_SUCCESS,
  EDIT_JOBR_BEGIN,
  EDIT_JOBR_SUCCESS,
  EDIT_JOBR_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from "./actions";

// set as default

const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  userLocation: "",
  showSidebar: false,
  isEditing: false,
  // editJobId: "",
  // position: "",
  // company: "",
  // jobLocation: "",
  // jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  // jobType: "full-time",
  // statusOptions: ["interview", "declined", "pending"],
  // status: "pending",

  page: 0,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  jobDocument: "",
  jobsRequest: [],
  randomNumber: Math.floor(Math.random() * 99) + 1,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "/api/v1",
    //headers: { Authorization: `Bearer ${token}` },
  });
  // request
  // authFetch.interceptors.request.use(
  //   (config) => {
  //     //console.log("config:", config.headers);
  //     //config.headers.common["Authorization"] = `Bearer ${state.token}`;

  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
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

  const displayAlertText = ({ alertType, alertText }) => {
    dispatch({ type: DISPLAY_ALERT_TEXT, payload: { alertType, alertText } });
    clearAlert();
  };

  const clearAlert = () => {
    // console.log("clear alert timeout 3000");
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  //local storage
  // const addUserToLocalStorage = ({ user, token, location }) => {
  //   console.log("appcontext", token);
  //   localStorage.setItem("user", JSON.stringify(user));
  //   localStorage.setItem("token", token);
  //   localStorage.setItem("location", location);
  // };

  // const removeUserFromLocalStorage = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("location");
  // };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });

    //console.log("currentUser :", currentUser);

    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      console.log("data :", data);
      const { user, location } = data;
      console.log("user :", user);
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, location, alertText },
      });

      //local storage
      // addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
    //console.log("showSidebar :", state.showSidebar);
  };

  const logoutUser = async () => {
    await authFetch.get("/auth/logout");
    dispatch({ type: LOGOUT_USER });
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    //console.log("token :", state.token);
    //console.log("currentUser :", currentUser);
    try {
      // const { data } = await axios.patch(`/auth/updateUser`, currentUser, {
      //   headers: { Authorization: `Bearer ${state.token}` },
      // });
      const { data } = await authFetch.patch(`/auth/updateUser`, currentUser);
      console.log("data :", data);

      const { user, location } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location },
      });
      // addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    // console.log(`${name}:${value}`);
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/jobsrequest/stats");
      console.log(data);
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          // monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const clearFilters = () => {
    //console.log("clear Filter");
    dispatch({ type: CLEAR_FILTERS });
  };

  const createJobRequest = async ({
    currentJobRequest,
    arrayDetails,
    clearData,
  }) => {
    dispatch({ type: CREATE_JOBR_BEGIN });
    try {
      const {
        jobCompanyName,
        jobRequestNo,
        jobRequestDate,
        requestBy,
        department,
        costCenter,
        exampleProduct,
        documentCOA,
        documentRD,
        documentother,
        dueDate,
        acceptBy,
        acceptDate,
        acceptDescription,
        approveBy,
      } = currentJobRequest;
      console.log(currentJobRequest);
      const { data, status } = await authFetch.post("/jobsrequest", {
        jobCompanyName,
        jobRequestNo,
        jobRequestDate,
        requestBy,
        department,
        costCenter,
        exampleProduct,
        documentCOA,
        documentRD,
        documentother,
        dueDate,
        acceptBy,
        acceptDate,
        acceptDescription,
        approveBy,
        arrayDetails,
      });
      const documentNo = data.jobRequest.jobRequestNo;
      console.log(documentNo);
      if (status === 201) {
        dispatch({
          type: CREATE_JOBR_SUCCESS,
          payload: {
            alertText: `สร้าง Job Sample Request ที่เลข เอกสาร ${documentNo} สำเร็จ ...!!`,
            jobDocument: documentNo,
          },
        });
      }

      clearData();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOBR_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getJobsRequest = async () => {
    let url = `/jobsrequest`;

    dispatch({ type: GET_JOBSR_BEGIN });
    //console.log(url);
    try {
      const { data } = await authFetch(url);
      const { jobsRequest, totalJobsRequest } = data;

      // console.log(jobsRequest);
      dispatch({
        type: GET_JOBSR_SUCCESS,
        payload: {
          jobsRequest,
          totalJobsRequest,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const updateJobsRequest = async (item) => {
    //console.log(item);
    //dispatch({ type: EDIT_JOBR_BEGIN });
    const _jobRequestId = item._id;
    console.log(_jobRequestId);
    try {
      const status = "success";
      await authFetch.patch(`/jobsrequest/${_jobRequestId}`, {
        status,
      });
      // dispatch({ type: EDIT_JOBR_SUCCESS });
      // dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOBR_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const recordsAfterPagingAndSorting = () => {
    return filterFn.fn(state.jobsRequest);
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  const changePage = (page) => {
    dispatch({
      type: CHANGE_PAGE,
      payload: { page },
    });
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    //console.log("states :", state.userLoading);
    try {
      const { data } = await authFetch("/auth/getCurrentUser");
      const { user, location } = data;
      console.log("user :", user);
      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, location },
      });
      // console.log("states :", state.userLoading);
    } catch (error) {
      console.log("error :", error.response);
      if (error.response.status === 401) return;
      logoutUser();
    }
  };
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        displayAlertText,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        showStats,
        clearFilters,

        createJobRequest,
        getJobsRequest,
        updateJobsRequest,
        recordsAfterPagingAndSorting,
        stableSort,
        getComparator,
        setFilterFn,
        changePage,
        getCurrentUser,
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

export { AppProvider, initialState };
