import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import AdminLoginScreen from './screens/AdminLoginScreen';
import DoctorLoginScreen from './screens/DoctorLoginScreen';
import PatientLoginScreen from './screens/PatientLoginScreen';
import PatientRegisterScreen from './screens/PatientRegisterScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import DoctorsListScreen from './screens/DoctorsListScreen';
import DoctorProfileViewScreen from './screens/DoctorProfileViewScreen';
import PatientListScreen from './screens/PatientListScreen';
import PatientProfileViewScreen from './screens/PatientProfileViewScreen';
import DoctorRegisterScreen from './screens/DoctorRegisterScreen';
import CreateAppointmentScreen from './screens/CreateAppointmentScreen';
import ListPatientAppointmentsScreen from './screens/ListPatientAppointmentsScreen';
import AppointmentViewScreen from './screens/AppointmentViewScreen';
import AppointmentListScreen from './screens/AppointmentListScreen';
import AdminCreateAppointmentScreen from './screens/AdminCreateAppointmentScreen';
import ListDoctorAppointmentsScreen from './screens/ListDoctorAppointmentsScreen';
import DoctorAppointmentViewScreen from './screens/DoctorAppointmentViewScreen';
import ListMedicinesScreen from './screens/ListMedicinesScreen';
import CreatePriscriptionScreen from './screens/CreatePriscriptionScreen';
import DoctorEditScreen from './screens/DoctorEditScreen';
import PatientEditScreen from './screens/PatientEditScreen';
import AppointmentUpdateScreen from './screens/AppointmentUpdateScreen';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Route path="/medicines" component={ListMedicinesScreen} exact />
        <Route
          path="/appointment/:id"
          component={AppointmentViewScreen}
          exact
        />
        <Route path="/appointment" component={CreateAppointmentScreen} exact />
        <Route
          path="/admin/appointment/:id"
          component={AppointmentUpdateScreen}
          exact
        />
        <Route
          path="/admin/appointment"
          component={AdminCreateAppointmentScreen}
          exact
        />
        <Route
          path="/doctor/prescription/:id"
          component={CreatePriscriptionScreen}
          exact
        />
        <Route
          path="/doctor/viewappointment/:id"
          component={DoctorAppointmentViewScreen}
          exact
        />
        <Route
          path="/doctor/appointments/:id"
          component={ListDoctorAppointmentsScreen}
          exact
        />
        <Route
          path="/doctor/edit-profile/:id"
          component={DoctorEditScreen}
          exact
        />
        <Route
          path="/doctor/profile/:id"
          component={DoctorProfileViewScreen}
          exact
        />
        <Route
          path="/patient/appointments/:id"
          component={ListPatientAppointmentsScreen}
          exact
        />
        <Route
          path="/patient/edit-profile/:id"
          component={PatientEditScreen}
          exact
        />

        <Route
          path="/patient/profile/:id"
          component={PatientProfileViewScreen}
          exact
        />
        <Route path="/admin/doctorlist" component={DoctorsListScreen} exact />
        <Route path="/admin/patientlist" component={PatientListScreen} exact />
        <Route
          path="/admin/appointmentlist"
          component={AppointmentListScreen}
          exact
        />
        <Route
          path="/admin/admindashboard"
          component={AdminDashboardScreen}
          exact
        />
        <Route path="/doctorregister" component={DoctorRegisterScreen} exact />
        <Route
          path="/patientregister"
          component={PatientRegisterScreen}
          exact
        />
        <Route path="/doctorlogin" component={DoctorLoginScreen} exact />
        <Route path="/patientlogin" component={PatientLoginScreen} exact />
        <Route path="/adminlogin" component={AdminLoginScreen} exact />
        <Route path="/" component={HomeScreen} exact />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
