import {
  APPOINTMENT_COMPLETED_FAIL,
  APPOINTMENT_COMPLETED_REQUEST,
  APPOINTMENT_COMPLETED_RESET,
  APPOINTMENT_COMPLETED_SUCCESS,
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_DETAILS_FAIL,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_OF_DOCTOR_LIST_FAIL,
  APPOINTMENT_OF_DOCTOR_LIST_REQUEST,
  APPOINTMENT_OF_DOCTOR_LIST_RESET,
  APPOINTMENT_OF_DOCTOR_LIST_SUCCESS,
  APPOINTMENT_OF_PATIENT_LIST_FAIL,
  APPOINTMENT_OF_PATIENT_LIST_REQUEST,
  APPOINTMENT_OF_PATIENT_LIST_RESET,
  APPOINTMENT_OF_PATIENT_LIST_SUCCESS,
  APPOINTMENT_UPDATE_FAIL,
  APPOINTMENT_UPDATE_REQUEST,
  APPOINTMENT_UPDATE_RESET,
  APPOINTMENT_UPDATE_SUCCESS,
  PRESCRIPTION_CREATE_FAIL,
  PRESCRIPTION_CREATE_REQUEST,
  PRESCRIPTION_CREATE_SUCCESS,
  PRESCRIPTION_DETAILS_FAIL,
  PRESCRIPTION_DETAILS_REQUEST,
  PRESCRIPTION_DETAILS_SUCCESS,
} from '../constants/appointmentConstants';

export const appointmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case APPOINTMENT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        appointment: action.payload,
      };
    case APPOINTMENT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const appointmentOfPatientListReducer = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_OF_PATIENT_LIST_REQUEST:
      return { loading: true };
    case APPOINTMENT_OF_PATIENT_LIST_SUCCESS:
      return { loading: false, appointments: action.payload };
    case APPOINTMENT_OF_PATIENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_OF_PATIENT_LIST_RESET:
      return { appointments: [] };
    default:
      return state;
  }
};

export const appointmentOfDoctorListReducer = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_OF_DOCTOR_LIST_REQUEST:
      return { loading: true };
    case APPOINTMENT_OF_DOCTOR_LIST_SUCCESS:
      return { loading: false, appointments: action.payload };
    case APPOINTMENT_OF_DOCTOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_OF_DOCTOR_LIST_RESET:
      return { appointments: [] };
    default:
      return state;
  }
};
export const appointmentDetailsReducer = (
  state = { appointment: {} },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_DETAILS_REQUEST:
      return { loading: true };
    case APPOINTMENT_DETAILS_SUCCESS:
      return { loading: false, appointment: action.payload };
    case APPOINTMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const prescriptionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRESCRIPTION_CREATE_REQUEST:
      return {
        loading: true,
      };
    case PRESCRIPTION_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        prescription: action.payload,
      };
    case PRESCRIPTION_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const prescriptionDetailsReducer = (
  state = { prescription: [] },
  action
) => {
  switch (action.type) {
    case PRESCRIPTION_DETAILS_REQUEST:
      return { loading: true };
    case PRESCRIPTION_DETAILS_SUCCESS:
      return { loading: false, prescription: action.payload };
    case PRESCRIPTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentCompletedReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_COMPLETED_REQUEST:
      return {
        loading: true,
      };
    case APPOINTMENT_COMPLETED_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case APPOINTMENT_COMPLETED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case APPOINTMENT_COMPLETED_RESET:
      return {};
    default:
      return state;
  }
};

export const appointmentUpdateReducer = (
  state = { appointment: {} },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_UPDATE_REQUEST:
      return { loading: true };
    case APPOINTMENT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case APPOINTMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_UPDATE_RESET:
      return {
        appointment: {},
      };
    default:
      return state;
  }
};
