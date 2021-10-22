import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  PATIENT_LIST_FAIL,
  PATIENT_LIST_REQUEST,
  PATIENT_LIST_SUCCESS,
  PATIENT_LIST_RESET,
  DOCTOR_LIST_REQUEST,
  DOCTOR_LIST_SUCCESS,
  DOCTOR_LIST_FAIL,
  DOCTOR_LIST_RESET,
  PATIENT_DELETE_REQUEST,
  PATIENT_DELETE_SUCCESS,
  PATIENT_DELETE_FAIL,
  DOCTOR_DELETE_REQUEST,
  DOCTOR_DELETE_SUCCESS,
  DOCTOR_DELETE_FAIL,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_DELETE_REQUEST,
  APPOINTMENT_DELETE_SUCCESS,
  APPOINTMENT_DELETE_FAIL,
} from '../constants/userConstants';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: PATIENT_LIST_RESET,
  });
  dispatch({
    type: DOCTOR_LIST_RESET,
  });
};

export const listPatients = () => async (dispatch) => {
  try {
    dispatch({
      type: PATIENT_LIST_REQUEST,
    });

    const { data } = await axios.get('/api/users');

    dispatch({
      type: PATIENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listDoctors = () => async (dispatch) => {
  try {
    dispatch({
      type: DOCTOR_LIST_REQUEST,
    });

    const { data } = await axios.get('/api/users/doctors');

    dispatch({
      type: DOCTOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePatient = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PATIENT_DELETE_REQUEST,
    });

    await axios.delete(`/api/patients/profile/${id}`);

    dispatch({
      type: PATIENT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteDoctor = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DOCTOR_DELETE_REQUEST,
    });

    await axios.delete(`/api/doctors/profile/${id}`);

    dispatch({
      type: DOCTOR_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAppointments = () => async (dispatch) => {
  try {
    dispatch({
      type: APPOINTMENT_LIST_REQUEST,
    });

    const { data } = await axios.get('/api/users/appointments');

    dispatch({
      type: APPOINTMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAppointment = (id) => async (dispatch) => {
  try {
    dispatch({
      type: APPOINTMENT_DELETE_REQUEST,
    });

    await axios.delete(`/api/appointments/${id}/delete`);

    dispatch({
      type: APPOINTMENT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
