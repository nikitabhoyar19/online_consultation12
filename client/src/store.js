import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userLoginReducer,
  patientListReducer,
  doctorListReducer,
  patientDeleteReducer,
  doctorDeleteReducer,
  appointmentListReducer,
  appointmentDeleteReducer,
} from './reducers/userReducers';

import {
  doctorDetailsReducer,
  doctorLoginReducer,
  doctorRegisterReducer,
  doctorUpdateReducer,
} from './reducers/doctorReducers';

import {
  patientRegisterReducer,
  patientDetailsReducer,
  patientLoginReducer,
  patientUpdateReducer,
} from './reducers/patientReducers';

import {
  appointmentCreateReducer,
  appointmentOfPatientListReducer,
  appointmentDetailsReducer,
  appointmentOfDoctorListReducer,
  prescriptionCreateReducer,
  appointmentCompletedReducer,
  prescriptionDetailsReducer,
  appointmentUpdateReducer,
} from './reducers/appointmentReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  patientList: patientListReducer,
  doctorList: doctorListReducer,
  doctorDetails: doctorDetailsReducer,
  doctorLogin: doctorLoginReducer,
  patientRegister: patientRegisterReducer,
  patientDetails: patientDetailsReducer,
  patientLogin: patientLoginReducer,
  doctorRegister: doctorRegisterReducer,
  patientDelete: patientDeleteReducer,
  doctorDelete: doctorDeleteReducer,
  appointmentCreate: appointmentCreateReducer,
  appointmentOfPatientList: appointmentOfPatientListReducer,
  appointmentOfDoctorList: appointmentOfDoctorListReducer,
  appointmentDetails: appointmentDetailsReducer,
  appointmentList: appointmentListReducer,
  prescriptionCreate: prescriptionCreateReducer,
  appointmentCompleted: appointmentCompletedReducer,
  prescriptionDetails: prescriptionDetailsReducer,
  appointmentDelete: appointmentDeleteReducer,
  doctorUpdate: doctorUpdateReducer,
  patientUpdate: patientUpdateReducer,
  appointmentUpdate: appointmentUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const doctorInfoFromStorage = localStorage.getItem('doctorInfo')
  ? JSON.parse(localStorage.getItem('doctorInfo'))
  : null;

const patientInfoFromStorage = localStorage.getItem('patientInfo')
  ? JSON.parse(localStorage.getItem('patientInfo'))
  : null;
const middleware = [thunk];

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  doctorLogin: { doctorInfo: doctorInfoFromStorage },
  patientLogin: { patientInfo: patientInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
