import { FormEvent, useState } from 'react';
import axios from '../config/axios';

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export default function UserRegistrationForm() {
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isExistingUser, setExistingUser] = useState(false);

  const handleValidationError = (error: { param: string; msg: string }) => {
    switch (error.param) {
      case 'firstName':
        setFirstNameError(error.msg);
        break;
      case 'lastName':
        setLastNameError(error.msg);
        break;
      case 'email':
        setEmailError(error.msg);
        break;
      case 'password':
        setPasswordError(error.msg);
        break;
      case 'phoneNumber':
        setPhoneNumberError(error.msg);
        break;
    }
  };

  const clearValidationErrors = () => {
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setPhoneNumberError('');
    setConfirmPasswordError('');
    setExistingUser(false);
  };

  const submitRegisterRequest = async (event: FormEvent) => {
    event.preventDefault();

    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    const data: UserInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    if (phoneNumber !== '') {
      data.phoneNumber = phoneNumber;
    }

    const response = await axios.post('/users/signup', data);

    clearValidationErrors();
    if (response.status === 400) {
      if (response.data.type === 'DuplicateEmailError') {
        setExistingUser(true);
        return;
      }

      for (const error of response.data.errors) {
        handleValidationError(error);
      }
    } else {
      console.log(response.data);
    }
  };

  return (
    <div className="rounded bg-white p-5">
      <form className="m-auto p-5" onSubmit={submitRegisterRequest} noValidate>
        <input
          className="block focus:outline-none w-full focus:border-2"
          type="text"
          required={true}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <p className="text-red-500 text-sm">{firstNameError}</p>
        <input
          className="block focus:outline-none w-full focus:border-2"
          type="text"
          placeholder="Last Name"
          required={true}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <p className="text-red-500 text-sm">{lastNameError}</p>
        <input
          className="block focus:outline-none w-full focus:border-2"
          type="email"
          placeholder="Email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <p className="text-red-500 text-sm">{emailError}</p>
        <input
          className="block focus:outline-none w-full focus:border-2"
          type="password"
          min={6}
          placeholder="Password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <p className="text-red-500 text-sm">{passwordError}</p>
        <input
          className="block focus:outline-none w-full focus:border-2"
          type="password"
          min={6}
          placeholder="Confirm Password"
          required={true}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        <p className="text-red-500 text-sm">{confirmPasswordError}</p>
        <input
          className="block focus:outline-none w-full focus:border-2"
          type="tel"
          required={false}
          placeholder="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
        ></input>
        <p className="text-red-500 text-xs">{phoneNumberError}</p>
        <input type="submit"></input>
        <p
          className={
            (isExistingUser ? 'block ' : 'hidden ') + 'text-red-500 text-sm'
          }
        >
          An Account with this email already exists,{' '}
          <a className="underline" href="/login">
            log in
          </a>{' '}
          instead
        </p>
      </form>
    </div>
  );
}
