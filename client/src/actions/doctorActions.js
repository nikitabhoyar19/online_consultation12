import axios from 'axios';
import {
  DOCTOR_DETAILS_FAIL,
  DOCTOR_DETAILS_SUCCESS,
  DOCTOR_DETAILS_REQUEST,
  DOCTOR_LOGIN_REQUEST,
  DOCTOR_LOGIN_SUCCESS,
  DOCTOR_LOGIN_FAIL,
  DOCTOR_LOGOUT,
  DOCTOR_REGISTER_REQUEST,
  DOCTOR_REGISTER_SUCCESS,
  DOCTOR_REGISTER_FAIL,
  DOCTOR_UPDATE_REQUEST,
  DOCTOR_UPDATE_SUCCESS,
  DOCTOR_UPDATE_FAIL,
} from '../constants/doctorConstants';

export const listDoctordetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOCTOR_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/doctors/profile/${id}`);
    dispatch({ type: DOCTOR_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DOCTOR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginDoctor = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: DOCTOR_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/doctors/login',
      { email, password },
      config
    );

    dispatch({
      type: DOCTOR_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('doctorInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: DOCTOR_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logoutDoctor = () => (dispatch) => {
  localStorage.removeItem('doctorInfo');
  dispatch({
    type: DOCTOR_LOGOUT,
  });
};

export const registerDoctor = (
  name,
  email,
  contact,
  address,
  speciality,
  password
) => async (dispatch) => {
  try {
    dispatch({
      type: DOCTOR_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/doctors',
      { name, email, mobileNo: contact, address, speciality, password },
      config
    );

    dispatch({
      type: DOCTOR_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: DOCTOR_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('doctorInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: DOCTOR_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateDoctor = (doctor) => async (dispatch) => {
  try {
    dispatch({
      type: DOCTOR_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/doctors/${doctor._id}`,
      doctor,
      config
    );

    dispatch({
      type: DOCTOR_UPDATE_SUCCESS,
    });

    dispatch({
      type: DOCTOR_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
