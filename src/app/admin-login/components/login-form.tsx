"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signInAction } from "@/actions/auth/mutations";

import LoginAlert from "./login-alert";
import SubmitButton from "./submit-button";

export default function LoginForm() {
  const router = useRouter();
  const [authFailed, setAuthFailed] = useState(false);
  const [msgAuthFailed, setMsgAuthFailed] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    setIsLoading(true);

    const { success } = await signInAction(username, password);
    if (!success) {
      setAuthFailed(true);
      setMsgAuthFailed("Invalid username or password.");
      setIsLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <>
      {authFailed && <LoginAlert message={msgAuthFailed} />}
      <form onSubmit={handleSubmit} className="mt-3">
        <input
          name="username"
          type="text"
          className="form-control"
          placeholder="username"
          required
        />
        <input
          name="password"
          type="password"
          className="form-control mt-2"
          placeholder="password"
          required
        />
        <center>
          <SubmitButton isLoading={isLoading} />
        </center>
      </form>
    </>
  );
}
