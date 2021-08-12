import bcrypt from 'bcryptjs';

const patients = [
  {
    name: 'Arshad Ali',
    email: 'Arshad@example.com',
    password: bcrypt.hashSync('123456', 10),
    mobileNo: '9876543210',
    address: 'Bikaner',
    isApproved: true,
  },
  {
    name: 'Steve Smith',
    email: 'Steve@example.com',
    password: bcrypt.hashSync('123456', 10),
    mobileNo: '9876543210',
    address: 'London',
    isApproved: true,
  },
  {
    name: 'Allen Morris',
    email: 'Allen@example.com',
    password: bcrypt.hashSync('123456', 10),
    mobileNo: '9876543210',
    address: 'New York',
    isApproved: false,
  },
];

export default patients;
