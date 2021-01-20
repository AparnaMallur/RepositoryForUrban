import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    
    SET_MESSAGE,
  } from "./types";
  

  import AboutusService from "../services/aboutus.service"
  
  export const getJobList = (unixtimestamp,hashcode) => (dispatch) => {
    return AboutusService.getJobList(unixtimestamp,hashcode).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  console.log("dispatch action")
  console.log(response.data)
  
        return Promise.resolve(response.data);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const getJobDetails = (unixtimestamp,hashcode,JobId) => (dispatch) => {
    return AboutusService.getJobDetails(unixtimestamp,hashcode,JobId).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  console.log("dispatch action")
  console.log(response.data)
  
        return Promise.resolve(response.data);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };