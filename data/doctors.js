import bcrypt from 'bcryptjs';

const doctors = [
  {
    name: 'Johnny Depp',
    email: 'Johnny@example.com',
    password: bcrypt.hashSync('123456', 10),
    mobileNo: '9876543210',
    address: 'Washington',
    isApproved: true,
    speciality: 'Cardiologist',
  },
  {
    name: 'Fabian',
    email: 'Fabian@example.com',
    password: bcrypt.hashSync('123456', 10),
    mobileNo: '9876543210',
    address: 'London',
    isApproved: true,
    speciality: 'Emergency Services',
  },
  {
    name: 'Josh',
    email: 'Josh@example.com',
    password: bcrypt.hashSync('123456', 10),
    mobileNo: '9876543210',
    address: 'New York',
    isApproved: true,
    speciality: 'Gynecologist',
  },
];

export default doctors;
