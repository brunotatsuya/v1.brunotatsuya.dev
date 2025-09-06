"use client";

import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { signInApi } from "@/actions/auth";

export default function LoginPage() {
  const router = useRouter();

  const [authFailed, setAuthFailed] = useState();
  const [msgAuthFailed, setMsgAuthFailed] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    setIsLoading(true);

    const response = await signInApi(username, password);
    if (!response.success) {
      setAuthFailed(true);
      setMsgAuthFailed(response.message);
      setIsLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Login Admin | Bruno Tatsuya</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>

      <div
        className="d-flex align-items-center justify-content-center vh-100"
        id="presentationCard"
      >
        <div className="bg-dark bg-opacity-25 px-4 pt-4 pb-4 border-075">
          <center>
            <img src="/images/favicon.ico" width="48" alt="Site favicon" />
          </center>
          <center>
            <h6 className="mx-2 pt-2 text-white">login admin</h6>
          </center>
          {authFailed ? (
            <div className="alert alert-danger mt-4" role="alert">
              {msgAuthFailed}
            </div>
          ) : (
            <></>
          )}
          <div className="mt-3">
            <form onSubmit={handleSubmit}>
              <input
                id="username"
                type="username"
                className="form-control"
                placeholder="username"
                required
              />
              <input
                id="password"
                type="password"
                className="form-control mt-2"
                placeholder="password"
                required
              />
              <center>
                {isLoading ? (
                  <button className="btn btn-primary mt-4" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary mt-4">
                    sign in
                  </button>
                )}
              </center>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
