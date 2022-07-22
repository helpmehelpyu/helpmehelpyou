import axios from "../config/axios";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { setAuthCookie } from "../auth/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState("");

  const submitLoginRequest = async (event: FormEvent) => {
    event.preventDefault();

    // clear all login errors
    setLoginErrors("");
    const response = await axios.post("/users/login", {
      email: email,
      password: password,
    });

    if (response.status === 200) {
      setAuthCookie(response.data.auth_token);
      // set cookies or something here, handle success
    } else {
      setLoginErrors(response.data.message);
    }
  };

  return (
    <div className="rounded bg-white p-10 border-2 w-1/4">
      <h1 className="p-1 m-2 text-3xl">Login</h1>
      <form onSubmit={submitLoginRequest} noValidate>
        <input
          className="focus:outline-none w-full border-2 focus:bg-slate-100 p-1 m-2"
          type="email"
          placeholder="Email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="focus:outline-none w-full border-2 focus:bg-slate-100 p-1 m-2"
          type="password"
          placeholder="Password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <p className="text-red-500 text-sm mx-2 px-1">{loginErrors}</p>
        <input
          type="submit"
          className="m-2 p-1 text-cyan-500 border-2 rounded border-cyan-500"
        ></input>
        <p className="mx-2 px-1">
          Don&apos;t have an account?{" "}
          <Link href="/register">
            <a className="underline text-cyan-500">Register</a>
          </Link>{" "}
          instead.
        </p>
      </form>
    </div>
  );
}
