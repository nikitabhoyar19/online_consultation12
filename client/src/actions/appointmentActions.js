import {
  APPOINTMENT_COMPLETED_FAIL,
  APPOINTMENT_COMPLETED_REQUEST,
  APPOINTMENT_COMPLETED_SUCCESS,
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_DETAILS_FAIL,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_OF_DOCTOR_LIST_FAIL,
  APPOINTMENT_OF_DOCTOR_LIST_REQUEST,
  APPOINTMENT_OF_DOCTOR_LIST_SUCCESS,
  APPOINTMENT_OF_PATIENT_LIST_FAIL,
  APPOINTMENT_OF_PATIENT_LIST_REQUEST,
  APPOINTMENT_OF_PATIENT_LIST_SUCCESS,
  APPOINTMENT_UPDATE_FAIL,
  APPOINTMENT_UPDATE_REQUEST,
  APPOINTMENT_UPDATE_SUCCESS,
  PRESCRIPTION_CREATE_FAIL,
  PRESCRIPTION_CREATE_REQUEST,
  PRESCRIPTION_CREATE_SUCCESS,
  PRESCRIPTION_DETAILS_FAIL,
  PRESCRIPTION_DETAILS_REQUEST,
  PRESCRIPTION_DETAILS_SUCCESS,
} from '../constants/appointmentConstants';
import axios from 'axios';

export const createAppointment = (order) => async (dispatch) => {
  try {
    dispatch({
      type: APPOINTMENT_CREATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`/api/appointments`, order, config);

    dispatch({
      type: APPOINTMENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAppointmentsOfPatient = (id) => async (dispatch) => {
  try {
    dispatch({
      type: APPOINTMENT_OF_PATIENT_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/appointments/${id}`);

    dispatch({
      type: APPOINTMENT_OF_PATIENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_OF_PATIENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAppointmentsOfDoctor = (id) => async (dispatch) => {
  try {
    dispatch({
      type: APPOINTMENT_OF_DOCTOR_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/appointments/doctor/${id}`);

    dispatch({
      type: APPOINTMENT_OF_DOCTOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_OF_DOCTOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAppointmentDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: APPOINTMENT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `/api/appointments/appointmentdetails/${id}`
    );
    dispatch({ type: APPOINTMENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPrescription = (order) => async (dispatch) => {
  try {
    dispatch({
      type: PRESCRIPTION_CREATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `/api/appointments/prescription`,
      order,
      config
    );

    dispatch({
      type: PRESCRIPTION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRESCRIPTION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPrescriptionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRESCRIPTION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/appointments/${id}/prescription`);
    dispatch({ type: PRESCRIPTION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRESCRIPTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const completeAppointment = (id) => async (dispatch) => {
  try {
    dispatch({
      type: APPOINTMENT_COMPLETED_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/appointments/${id}/completed`,
      config
    );

    dispatch({
      type: APPOINTMENT_COMPLETED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_COMPLETED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAppointment = (appointment) => async (dispatch) => {
  try {
    dispatch({
      type: APPOINTMENT_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/appointments/${appointment._id}`,
      appointment,
      config
    );

    dispatch({
      type: APPOINTMENT_UPDATE_SUCCESS,
    });

    dispatch({
      type: APPOINTMENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
