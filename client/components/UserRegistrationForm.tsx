import { FormEvent, useState } from 'react';
import axios from '../config/axios';

export default function UserRegistrationForm() {
  const [firstName, setFirstName] = useState('');
  const [firstNameErrors, setFirstNameErrors] = useState([]);
  const [lastName, setLastName] = useState('');
  const [lastNameErrors, setLastNameErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [emailErrors, setEmailErrors] = useState([]);
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberErrors, setPhoneNumberErrors] = useState([]);

  const submitRegisterRequest = async (event: FormEvent) => {
    event.preventDefault();
    const result = await axios.post('/users/signup', {
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
      },
    });

    if (result.status > 200) {
      console.log(result.data.errors);
    }
  };

  return (
    <form onSubmit={submitRegisterRequest} noValidate>
      <input
        className="block ring-1 focus:outline-none my-2"
        type="text"
        required={true}
        placeholder="First Name"
        onChange={(e) => setFirstName(e.target.value)}
      ></input>
      <input
        className="block ring-1 focus:outline-none my-2"
        type="text"
        placeholder="Last Name"
        required={true}
        onChange={(e) => setLastName(e.target.value)}
      ></input>
      <input
        className="block ring-1 focus:outline-none my-2"
        type="email"
        placeholder="Email"
        required={true}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        className="block ring-1 focus:outline-none my-2"
        type="password"
        min={6}
        placeholder="Password"
        required={true}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <input
        className="block ring-1 focus:outline-none my-2"
        type="tel"
        required={false}
        placeholder="Phone Number"
        onChange={(e) => setPhoneNumber(e.target.value)}
      ></input>
      <input type="submit"></input>
    </form>
  );
}
