import Link from "next/link";
import { FormEvent, useState } from "react";
import { setAuthCookie } from "../auth/auth";
import axios from "../config/axios";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export default function UserRegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [isExistingUser, setExistingUser] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(true);

  const handleValidationError = (error: { param: string; msg: string }) => {
    switch (error.param) {
      case "firstName":
        setFirstNameError(error.msg);
        break;
      case "lastName":
        setLastNameError(error.msg);
        break;
      case "email":
        setEmailError(error.msg);
        break;
      case "password":
        setPasswordError(error.msg);
        break;
      case "phoneNumber":
        setPhoneNumberError(error.msg);
        break;
    }
  };

  const clearValidationErrors = () => {
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setPhoneNumberError("");
    setConfirmPasswordError("");
    setExistingUser(false);
  };

  const submitRegisterRequest = async (event: FormEvent) => {
    event.preventDefault();
    if (!allowSubmit) return;
    setAllowSubmit(false);

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    const data: UserInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    if (phoneNumber !== "") {
      data.phoneNumber = phoneNumber;
    }

    const response = await axios.post("/users/signup", data);

    clearValidationErrors();
    if (response.status === 400) {
      if (response.data.type === "DuplicateEmailError") {
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
    <div className="rounded bg-white p-5 border-2 w-1/3">
      <h1 className="p-5 m-2 text-4xl">Register</h1>
      <form className="m-auto px-5" onSubmit={submitRegisterRequest} noValidate>
        <p
          className={
            (isExistingUser ? "block " : "hidden ") +
            "text-red-500 text-sm mx-2 px-1"
          }
        >
          An Account with this email already exists,{" "}
          <Link className="underline" href="/login">
            log in
          </Link>{" "}
          instead
        </p>
        <input
          className="rounded focus:outline-none w-full border-2 focus:bg-slate-100 p-1 m-2"
          type="text"
          required={true}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <p className="text-red-500 text-sm mx-2 px-1">{firstNameError}</p>
        <input
          className="rounded focus:outline-none w-full border-2 focus:bg-slate-100 p-1 m-2"
          type="text"
          placeholder="Last Name"
          required={true}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <p className="text-red-500 text-sm mx-2 px-1">{lastNameError}</p>
        <input
          className="rounded focus:outline-none w-full border-2 focus:bg-slate-100 p-1 m-2"
          type="email"
          placeholder="Email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <p className="text-red-500 text-sm mx-2 px-1">{emailError}</p>
        <input
          className="rounded focus:outline-none w-full border-2 focus:bg-slate-100 p-1 m-2"
          type="tel"
          required={false}
          placeholder="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
        ></input>
        <p className="text-red-500 text-xs">{phoneNumberError}</p>
        <input
          className="rounded focus:outline-none w-full border-2 focus:bg-slate-100 p-1 m-2"
          type="password"
          min={6}
          placeholder="Password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <p className="text-red-500 text-sm mx-2 px-1">{passwordError}</p>
        <input
          className="rounded focus:outline-none w-full border-2 focus:bg-slate-100 p-1 m-2"
          type="password"
          min={6}
          placeholder="Confirm Password"
          required={true}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        <p className="text-red-500 text-sm mx-2 px-1">{confirmPasswordError}</p>

        <input
          type="submit"
          className="m-2 p-1 text-cyan-500 border-2 rounded border-cyan-500"
        ></input>

        <p className="mx-2 px-1">
          Already have an account?{" "}
          <Link href="/login">
            <a className="underline text-cyan-500">Login</a>
          </Link>{" "}
          instead.
        </p>
      </form>
    </div>
  );
}
