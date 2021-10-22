import axios from 'axios';
import {
  PATIENT_REGISTER_REQUEST,
  PATIENT_REGISTER_SUCCESS,
  PATIENT_REGISTER_FAIL,
  PATIENT_DETAILS_REQUEST,
  PATIENT_DETAILS_SUCCESS,
  PATIENT_DETAILS_FAIL,
  PATIENT_LOGIN_REQUEST,
  PATIENT_LOGIN_SUCCESS,
  PATIENT_LOGIN_FAIL,
  PATIENT_LOGOUT,
  PATIENT_UPDATE_REQUEST,
  PATIENT_UPDATE_SUCCESS,
  PATIENT_UPDATE_FAIL,
} from '../constants/patientConstants';

export const registerPatient = (
  name,
  email,
  contact,
  address,
  password
) => async (dispatch) => {
  try {
    dispatch({
      type: PATIENT_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/patients',
      { name, email, mobileNo: contact, address, password },
      config
    );

    dispatch({
      type: PATIENT_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: PATIENT_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('patientInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PATIENT_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPatientDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PATIENT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/patients/profile/${id}`);
    dispatch({ type: PATIENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PATIENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginPatient = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: PATIENT_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/patients/login',
      { email, password },
      config
    );

    dispatch({
      type: PATIENT_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('patientInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PATIENT_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logoutPatient = () => (dispatch) => {
  localStorage.removeItem('patientInfo');
  dispatch({
    type: PATIENT_LOGOUT,
  });
};

export const updatePatient = (patient) => async (dispatch) => {
  try {
    dispatch({
      type: PATIENT_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/patients/${patient._id}`,
      patient,
      config
    );

    dispatch({
      type: PATIENT_UPDATE_SUCCESS,
    });

    dispatch({
      type: PATIENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
