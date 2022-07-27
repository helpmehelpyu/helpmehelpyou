import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { setAuthCookie } from '../auth/auth';
import axios from '../config/axios';
import FloatingLabelInput from './FloatingLabelField';

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
  const [allowSubmit, setAllowSubmit] = useState(true);

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
    if (!allowSubmit) return;
    setAllowSubmit(false);

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
      setAuthCookie(response.data.auth_token);
      // TODO redirect user to another page
    }
    setAllowSubmit(true);
  };

  return (
    <div className="rounded bg-white p-5 border-2 min-w-fit w-1/3">
      <h1 className="p-5 m-2 text-4xl font-bold">Register</h1>
      <form className="m-auto px-5" onSubmit={submitRegisterRequest} noValidate>
        <p
          className={
            (isExistingUser ? 'block ' : 'hidden ') +
            'text-red-500 text-sm mx-2 px-1'
          }
        >
          An Account with this email already exists,{' '}
          <Link className="underline" href="/login">
            log in
          </Link>{' '}
          instead
        </p>
        <FloatingLabelInput
          type="text"
          placeholder="First Name"
          isRequired={true}
          setValue={setFirstName}
        ></FloatingLabelInput>
        <p className="text-red-500 text-sm mx-2 px-1">{firstNameError}</p>
        <FloatingLabelInput
          type="text"
          placeholder="Last Name"
          isRequired={true}
          setValue={setLastName}
        ></FloatingLabelInput>
        <p className="text-red-500 text-sm mx-2 px-1">{lastNameError}</p>
        <FloatingLabelInput
          type="email"
          placeholder="Email"
          isRequired={true}
          setValue={setEmail}
        ></FloatingLabelInput>
        <p className="text-red-500 text-sm mx-2 px-1">{emailError}</p>
        <FloatingLabelInput
          type="tel"
          placeholder="Phone Number"
          isRequired={false}
          setValue={setLastName}
        ></FloatingLabelInput>
        <p className="text-red-500 text-xs">{phoneNumberError}</p>
        <FloatingLabelInput
          type="password"
          placeholder="Password"
          isRequired={true}
          setValue={setPassword}
        ></FloatingLabelInput>
        <p className="text-red-500 text-sm mx-2 px-1">{passwordError}</p>
        <FloatingLabelInput
          type="password"
          placeholder="Confirm Password"
          isRequired={true}
          setValue={setConfirmPassword}
        ></FloatingLabelInput>
        <p className="text-red-500 text-sm mx-2 px-1">{confirmPasswordError}</p>

        <input
          type="submit"
          className="m-2 p-1 text-cyan-500 border-2 rounded border-cyan-500"
        ></input>

        <p className="mx-2 px-1">
          Already have an account?{' '}
          <Link href="/login">
            <a className="underline text-cyan-500">Login</a>
          </Link>{' '}
          instead.
        </p>
      </form>
    </div>
  );
}
